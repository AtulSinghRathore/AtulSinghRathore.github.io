import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'text', title: 'Description' }),
    defineField({ name: 'accentColor', type: 'string', title: 'Accent Color' }),
    defineField({
      name: 'socials',
      type: 'array',
      of: [{ type: 'url' }]
    }),
    defineField({ name: 'contactEmail', type: 'string', title: 'Contact Email' })
  ]
})
