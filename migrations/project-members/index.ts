import { at, defineMigration, setIfMissing, unset } from "sanity/migrate";

// Moves each project's old single `member` reference into the `members` list.
// Dry run:  npx sanity migration run project-members
// Apply:    npx sanity migration run project-members --no-dry-run
export default defineMigration({
  title: "Project: member -> members",
  documentTypes: ["project"],
  filter: "defined(member)",
  migrate: {
    document(doc) {
      const member = doc.member as { _ref: string } | undefined;
      if (!member?._ref) return [];
      return [
        at("members", setIfMissing([{ _type: "reference", _ref: member._ref, _key: member._ref.slice(0, 12) }])),
        at("member", unset()),
      ];
    },
  },
});
