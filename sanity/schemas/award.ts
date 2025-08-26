import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'org', type: 'string' }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'link', type: 'url' })
  ]
})
