const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "text", title: "Description" },
    { name: "accentColor", type: "string", title: "Accent Color" },
    { name: "contactEmail", type: "string", title: "Contact Email" }
  ]
};
export default siteSettings;
