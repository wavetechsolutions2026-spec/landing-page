import { ProjectsIcon } from "@sanity/icons/Projects";
import { defineArrayMember, defineField, defineType } from "sanity";

// Matches the industry tiles in the "Selected work" section.
const INDUSTRIES = [
  { title: "Healthcare", value: "healthcare" },
  { title: "Rewards & CRM", value: "rewards" },
  { title: "Government & e-learning", value: "government" },
  { title: "Mobility & car rental", value: "mobility" },
  { title: "Housing & social apps", value: "property" },
  { title: "Telecom & cloud", value: "telecom" },
  { title: "E-commerce", value: "ecommerce" },
];

// An individual team member's project, not agency client work.
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      type: "string",
      description: 'Type of work, e.g. "UX/UI redesign".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "industry",
      type: "string",
      options: { list: INDUSTRIES, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "members",
      title: "Team members",
      description: "Everyone who worked on this project. The first one is shown first on the card.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "context",
      type: "string",
      description: 'Where the work was done, e.g. "At Haupcar".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "linkLabel",
      type: "string",
      description: 'e.g. "View on Behance".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      description: "16:10, at least 1200×750 px. Only use images you have permission to show.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alternative text" })],
    }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: {
      title: "title",
      m0: "members.0.shortName",
      m1: "members.1.shortName",
      m2: "members.2.shortName",
      media: "image",
    },
    prepare: ({ title, m0, m1, m2, media }) => ({
      title,
      subtitle: [m0, m1, m2].filter(Boolean).join(", "),
      media,
    }),
  },
});
