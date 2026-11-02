import { defineQuery } from "next-sanity";

// Documents without an `order` sort after numbered ones, oldest first.
const ORDER = "order(coalesce(order, 9999) asc, _createdAt asc)";

export const LANDING_QUERY = defineQuery(`{
  "techStack": *[_type == "techStack" && defined(name)] | ${ORDER} {
    "id": _id, name, logo
  },
  "services": *[_type == "service" && defined(title)] | ${ORDER} {
    "id": _id, title, icon, description, "bullets": coalesce(bullets, [])
  },
  "faqs": *[_type == "faq" && defined(question)] | ${ORDER} {
    "id": _id, question, answer
  },
  "team": *[_type == "teamMember" && defined(name)] | ${ORDER} {
    "id": _id, name, shortName, role, bio, photo,
    "skills": coalesce(skills, []), portfolioUrl, githubUrl, linkedinUrl
  },
  "projects": *[_type == "project" && defined(title)] | ${ORDER} {
    "id": _id, title, category, summary, industry,
"members": coalesce(members[]->shortName, []), context, "href": link, linkLabel, image
  }
}`);
