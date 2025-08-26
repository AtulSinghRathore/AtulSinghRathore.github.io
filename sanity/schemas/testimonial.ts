import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'quote', type: 'text' }),
    defineField({ name: 'avatar', type: 'image' })
  ]
})
