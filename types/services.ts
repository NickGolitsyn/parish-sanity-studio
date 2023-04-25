import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'servicearray',
      type: 'array',
      title: 'Services',
      of: [
        {
          type: "object",
          title: "service",
          fields: [
            {
              name: "myDate",
              type: "date",
              title: "My Date",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "serviceDescription",
              type: "text",
              title: "Description",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'myDate',
            },
            prepare({ title }) {
              return {
                title,
                icon: CalendarIcon,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Main',
      }
    },
  },
})
