import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImageIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Gallery photos',
      of: [{
        type: 'object',
        fields: [
          {
            type: 'image',
            name: 'image', 
            title: 'Image',
            options: {
              hotspot: true // <-- Defaults to false
            },
            validation: (Rule) => Rule.required(),
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
        ]
      }]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
