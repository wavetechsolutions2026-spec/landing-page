import { defineQuery } from "next-sanity";

// Documents without an `order` sort after numbered ones, oldest first.
const ORDER = "order(coalesce(order, 9999) asc, _createdAt asc)";

export const LANDING_QUERY = defineQuery(`{
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
    // Older documents have a single "member" reference instead of "members".
    "members": select(
      count(members) > 0 => members[]->shortName,
      defined(member) => [member->shortName],
      []
    ), context, "href": link, linkLabel, image
  }
}`);
