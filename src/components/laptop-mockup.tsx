"use client";

// Decorative laptop: a code editor that types, erases, and switches between
// snippets, with a live preview of each page beside it. Pure markup and CSS,
// no images or extra fonts. The first snippet is server-rendered in full; the
// loop only runs while the laptop is on screen, the tab is visible, and the
// visitor has not asked for reduced motion.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Token = [text: string, className?: string];
type Preview = "store" | "booking" | "dashboard";
type Snippet = { file: string; preview: Preview; lines: Token[][] };
type Phase = "typing" | "hold" | "erasing";

const KEYWORD = "text-accent-highlight";
const TAG = "text-foreground";
const MUTED = "text-muted-foreground";

function page(name: string, body: Token[][]): Token[][] {
  return [
    [["export default function ", KEYWORD], [name, TAG], ["() {", MUTED]],
    [["  return ", KEYWORD], ["(", MUTED]],
    [["    <", MUTED], ["main", TAG], [">", MUTED]],
    ...body,
    [["    </", MUTED], ["main", TAG], [">", MUTED]],
    [["  );", MUTED]],
    [["}", MUTED]],
  ];
}

function element(name: string, prop: string, value: Token[]): Token[] {
  return [["      <", MUTED], [`${name} `, TAG], [`${prop}=`, MUTED], ...value, [" />", MUTED]];
}

const str = (text: string): Token[] => [[`"${text}"`, KEYWORD]];
const expr = (text: string, className = TAG): Token[] => [["{", MUTED], [text, className], ["}", MUTED]];

const SNIPPETS: Snippet[] = [
  {
    file: "store.tsx",
    preview: "store",
    lines: page("Store", [
      element("Hero", "title", str("Fresh coffee, delivered")),
      element("ProductGrid", "items", expr("products")),
      element("Checkout", "payments", expr('["card", "mobile"]', KEYWORD)),
    ]),
  },
  {
    file: "booking.tsx",
    preview: "booking",
    lines: page("Booking", [
      element("Calendar", "days", expr("14", KEYWORD)),
      element("TimeSlots", "from", str("09:00")),
      element("BookButton", "label", str("Reserve a table")),
    ]),
  },
  {
    file: "dashboard.tsx",
    preview: "dashboard",
    lines: page("Dashboard", [
      element("SalesChart", "range", str("this-month")),
      element("OrdersTable", "status", str("new")),
      element("StockAlerts", "threshold", expr("10", KEYWORD)),
    ]),
  },
];

const LINE_COUNT = Math.max(...SNIPPETS.map((s) => s.lines.length));
const lineLength = (line: Token[]) => line.reduce((sum, [text]) => sum + text.length, 0);
// Characters per snippet, counting one per line break.
const TOTALS = SNIPPETS.map(
  (s) => s.lines.reduce((sum, line) => sum + lineLength(line), 0) + s.lines.length - 1,
);

const TYPE_STEP = 2;
const TYPE_MS = 40;
const HOLD_MS = 3000;
const ERASE_STEP = 12;
const ERASE_MS = 16;

type State = { index: number; typed: number; phase: Phase };

function advance({ index, typed, phase }: State): State {
  if (phase === "typing") {
    const next = Math.min(TOTALS[index], typed + TYPE_STEP);
    return { index, typed: next, phase: next === TOTALS[index] ? "hold" : "typing" };
  }
  if (phase === "hold") return { index, typed, phase: "erasing" };
  const next = Math.max(0, typed - ERASE_STEP);
  return next === 0
    ? { index: (index + 1) % SNIPPETS.length, typed: 0, phase: "typing" }
    : { index, typed: next, phase: "erasing" };
}

// Line and column of the cursor after `typed` characters.
function locate(lines: Token[][], typed: number) {
  let left = typed;
  for (let line = 0; line < lines.length; line++) {
    const length = lineLength(lines[line]);
    if (left <= length) return { line, column: left };
    left -= length + 1;
  }
  return { line: lines.length - 1, column: lineLength(lines[lines.length - 1]) };
}

function truncate(line: Token[], column: number): Token[] {
  const out: Token[] = [];
  let left = column;
  for (const [text, className] of line) {
    if (left <= 0) break;
    out.push([text.slice(0, left), className]);
    left -= text.length;
  }
  return out;
}

export function LaptopMockup({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [state, setState] = useState<State>({ index: 0, typed: TOTALS[0], phase: "hold" });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  useEffect(() => {
    if (!inView || !pageVisible || reduceMotion) return;
    const delay = state.phase === "typing" ? TYPE_MS : state.phase === "hold" ? HOLD_MS : ERASE_MS;
    const id = window.setTimeout(() => setState(advance), delay);
    return () => window.clearTimeout(id);
  }, [state, inView, pageVisible, reduceMotion]);

  const snippet = SNIPPETS[state.index];
  const cursor = locate(snippet.lines, state.typed);

  return (
    <div ref={rootRef} className={className} aria-hidden="true">
      {/* Lid */}
      <div className="rounded-t-xl border border-card-border bg-surface p-2 sm:p-3">
        <div className="overflow-hidden rounded-md border bg-background text-left">
          {/* Window bar */}
          <div className="flex items-center gap-3 border-b px-3 py-2">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-card-border" />
              <span className="size-2.5 rounded-full bg-card-border" />
              <span className="size-2.5 rounded-full bg-card-border" />
            </div>
            <span className="rounded border border-card-border bg-surface px-2 py-0.5 font-mono text-xs text-foreground">
              {snippet.file}
            </span>
          </div>

          <div className="flex">
            {/* Editor: fixed number of rows so typing never changes the height. */}
            <pre className="min-w-0 flex-1 overflow-hidden py-4 font-mono text-xs leading-6 sm:text-sm sm:leading-7">
              {Array.from({ length: LINE_COUNT }, (_, i) => {
                const line = snippet.lines[i] ?? [];
                const tokens =
                  i < cursor.line ? line : i === cursor.line ? truncate(line, cursor.column) : [];
                return (
                  <div key={i} className="flex whitespace-pre">
                    <span className="w-8 shrink-0 select-none pr-3 text-right text-card-border sm:w-10">
                      {i + 1}
                    </span>
                    <span>
                      {tokens.map(([text, tokenClass], j) => (
                        <span key={j} className={tokenClass}>
                          {text}
                        </span>
                      ))}
                      {i === cursor.line && (
                        <span
                          className={cn(
                            "ml-px inline-block h-4 w-0.5 translate-y-0.5 bg-accent-highlight sm:h-5",
                            state.phase === "hold" && "motion-safe:animate-pulse",
                          )}
                        />
                      )}
                    </span>
                  </div>
                );
              })}
            </pre>

            {/* Live preview of the page being coded */}
            <div className="hidden w-48 shrink-0 border-l bg-surface p-3 md:block lg:w-56">
              <div className="h-full overflow-hidden rounded-md border border-card-border bg-background p-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={snippet.preview}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PreviewNav />
                    {snippet.preview === "store" && <StorePreview />}
                    {snippet.preview === "booking" && <BookingPreview />}
                    {snippet.preview === "dashboard" && <DashboardPreview />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base */}
      <div className="relative -mx-[4%] h-3 rounded-b-xl border border-t-0 border-card-border bg-surface sm:h-4">
        <span className="absolute left-1/2 top-0 h-1.5 w-1/6 -translate-x-1/2 rounded-b-md bg-background" />
      </div>
    </div>
  );
}

function PreviewNav() {
  return (
    <div className="flex items-center justify-between">
      <span className="h-1.5 w-8 rounded-full bg-muted-foreground/60" />
      <span className="h-1.5 w-12 rounded-full bg-card-border" />
    </div>
  );
}

function StorePreview() {
  return (
    <>
      <div className="mt-4 space-y-1.5">
        <span className="block h-2 w-4/5 rounded-full bg-foreground/80" />
        <span className="block h-2 w-3/5 rounded-full bg-foreground/80" />
        <span className="block h-1.5 w-full rounded-full bg-card-border" />
      </div>
      <span className="mt-3 block h-4 w-14 rounded bg-accent-fill" />
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((n) => (
          <div key={n} className="rounded border border-card-border p-1">
            <span className="block aspect-square rounded-sm bg-surface" />
            <span className="mt-1 block h-1 w-3/4 rounded-full bg-card-border" />
          </div>
        ))}
      </div>
    </>
  );
}

function BookingPreview() {
  return (
    <>
      <span className="mt-4 block h-2 w-2/3 rounded-full bg-foreground/80" />
      <div className="mt-3 grid grid-cols-7 gap-1">
        {Array.from({ length: 14 }, (_, n) => (
          <span
            key={n}
            className={cn(
              "aspect-square rounded-sm border border-card-border",
              n === 9 && "border-accent-highlight bg-accent-fill",
            )}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={cn("h-3 rounded-sm bg-surface", n === 1 && "bg-accent-highlight/40")}
          />
        ))}
      </div>
      <span className="mt-3 block h-4 w-full rounded bg-accent-fill" />
    </>
  );
}

function DashboardPreview() {
  return (
    <>
      <div className="mt-4 flex h-16 items-end gap-1.5 border-b border-card-border pb-px">
        {[40, 65, 50, 80, 60, 95, 75].map((height, n) => (
          <span
            key={n}
            className={cn("flex-1 rounded-t-sm bg-accent-fill", n === 5 && "bg-accent-highlight")}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        {[0, 1, 2].map((n) => (
          <div key={n} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-card-border" />
            <span className="h-1.5 flex-1 rounded-full bg-card-border" />
            <span className="h-1.5 w-6 rounded-full bg-muted-foreground/60" />
          </div>
        ))}
      </div>
    </>
  );
}
