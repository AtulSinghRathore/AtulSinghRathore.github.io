import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'year', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'coverImage', type: 'image' }),
    defineField({ name: 'hoverVideo', type: 'file' }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'caseSections', type: 'array', of: [{ type: 'block' }, { type: 'image' }] })
  ]
})
