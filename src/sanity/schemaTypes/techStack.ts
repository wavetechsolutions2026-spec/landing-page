import { CodeIcon } from "@sanity/icons/Code";
import { defineField, defineType } from "sanity";

// A tool or technology shown in the "Built with" row of the hero.
export const techStack = defineType({
  name: "techStack",
  title: "Tech stack",
  type: "document",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: 'e.g. "Next.js".',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "logo",
      type: "image",
      description: "Optional. A small square or wide logo (SVG or PNG) shown before the name.",
      options: { accept: "image/svg+xml,image/png,image/webp" },
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
});
