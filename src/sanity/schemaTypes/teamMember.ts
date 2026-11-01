import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "shortName",
      type: "string",
      description: 'Used in project credits, e.g. "Christine".',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bio", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "photo",
      type: "image",
      description: "At least 1200×900 px. Shown full width on the team card.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
    }),
    defineField({
      name: "skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.max(5),
    }),
    defineField({ name: "portfolioUrl", title: "Portfolio URL", type: "url" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
