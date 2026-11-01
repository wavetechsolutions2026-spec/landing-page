import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

// Icon names the services section knows how to render (lucide-react).
const SERVICE_ICONS = ["Layout", "LayoutGrid", "ShoppingCart", "Smartphone", "Code"];

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "icon",
      type: "string",
      options: { list: SERVICE_ICONS, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "description", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({
      name: "bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
