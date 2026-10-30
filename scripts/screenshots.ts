// Captures design-audit screenshots of the landing page.
// Usage: node scripts/screenshots.ts [outDir] [baseUrl]
//   outDir  defaults to audit/screenshots
//   baseUrl defaults to http://localhost:3000
// Requires a running server (npm run dev) and `npx playwright install chromium`.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "playwright";

const outDir = process.argv[2] ?? "audit/screenshots";
const baseUrl = process.argv[3] ?? "http://localhost:3000";
const widths = [360, 768, 1280, 1440];

// Scroll the whole page so every whileInView reveal has fired before capture.
// Waits for hydration first: reveals only observe the viewport once React has run.
async function revealAll(page: Page) {
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 300) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}

// Layout facts that are hard to read from a picture.
async function collectMetrics(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const fontSizes: Record<string, number> = {};
    for (const el of document.querySelectorAll<HTMLElement>("body *")) {
      if (!el.childNodes.length || el.closest("[aria-hidden=true]")) continue;
      const hasText = [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent!.trim().length > 0,
      );
      if (!hasText) continue;
      const size = getComputedStyle(el).fontSize;
      fontSizes[size] = (fontSizes[size] ?? 0) + 1;
    }
    const smallTargets = [
      ...document.querySelectorAll<HTMLElement>("a, button, [role=combobox]"),
    ]
      .filter((el) => el.offsetParent !== null)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40),
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      })
      .filter((t) => t.w < 44 || t.h < 44);
    return {
      horizontalOverflow: doc.scrollWidth > doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      pageHeight: doc.scrollHeight,
      h1Count: document.querySelectorAll("h1").length,
      headings: [...document.querySelectorAll("h1, h2, h3")].map(
        (h) => `${h.tagName} ${getComputedStyle(h).fontSize} ${h.textContent!.trim().slice(0, 40)}`,
      ),
      fontSizes,
      smallTargets,
    };
  });
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const metrics: Record<string, unknown> = {};

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await revealAll(page);
    await page.screenshot({ path: path.join(outDir, `full-${width}.png`), fullPage: true });
    metrics[width] = await collectMetrics(page);
    await page.close();
  }

  // Header after scrolling.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, "header-scrolled-1280.png") });
    await page.close();
  }

  // Mobile menu open.
  {
    const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outDir, "mobile-menu-360.png") });
    await page.close();
  }

  // Hovered service card.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    const services = page.locator("#services");
    await services.scrollIntoViewIfNeeded();
    await revealAll(page);
    await services.scrollIntoViewIfNeeded();
    const card = services.locator(".card-row > div, .grid > div").first();
    await card.hover();
    await page.waitForTimeout(500);
    await services.screenshot({ path: path.join(outDir, "card-hover-1280.png") });
    await page.close();
  }

  // Contact form validation errors, desktop and phone.
  for (const width of [1280, 360]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await revealAll(page);
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();
    await contact.locator("button[type=submit]").click();
    await page.waitForTimeout(500);
    await contact.screenshot({ path: path.join(outDir, `form-errors-${width}.png`) });
    await page.close();
  }

  // Keyboard focus: first few Tab stops from the top of the page.
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    await page.screenshot({ path: path.join(outDir, "focus-skip-link-1280.png") });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.screenshot({ path: path.join(outDir, "focus-nav-1280.png") });
    await page.close();
  }

  // Reduced motion: content should be visible without scrolling animations.
  {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.locator("#services").scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await page.screenshot({ path: path.join(outDir, "reduced-motion-1280.png") });
    await context.close();
  }

  await writeFile(path.join(outDir, "metrics.json"), JSON.stringify(metrics, null, 2));
  await browser.close();
  console.log(`Saved screenshots to ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
