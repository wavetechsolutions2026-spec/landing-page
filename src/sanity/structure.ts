import type { StructureResolver } from "sanity/structure";

// Studio sidebar, in the order the sections appear on the landing page.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("project").title("Selected work"),
      S.documentTypeListItem("faq").title("FAQ"),
    ]);
