const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "excerpt", type: "text", title: "Excerpt" },
    { name: "year", type: "string", title: "Year" },
    { name: "role", type: "string", title: "Role" },
    { name: "tags", type: "array", of: [{ type: "string" }], title: "Tags" },
    { name: "coverImage", type: "image", title: "Cover Image" },
    {
      name: "caseSections",
      title: "Case Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "heading", type: "string", title: "Heading" },
            { name: "body", type: "text", title: "Body" },
            { name: "media", type: "image", title: "Media" }
          ]
        }
      ]
    }
  ]
};
export default project;
