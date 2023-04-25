import { HomeIcon } from '@sanity/icons'
import { ImageIcon } from '@sanity/icons'
import { CalendarIcon } from '@sanity/icons'
import { CogIcon } from '@sanity/icons'

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["settings"])

export default defineConfig({
  name: 'default',
  title: 'Parish Sanity Studio',

  projectId: 'lf5do3mg',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home")
              .id("home")
              .icon(HomeIcon)
              .child(
                S.document()
                  .schemaType("home")
                  .documentId("home")
              ),
              S.listItem()
              .title("Services")
              .id("services")
              .icon(CalendarIcon)
              .child(
                S.document()
                  .schemaType("services")
                  .documentId("services")
              ),
              S.listItem()
              .title("Gallery")
              .id("gallery")
              .icon(ImageIcon)
              .child(
                S.document()
                  .schemaType("gallery")
                  .documentId("gallery")
              ),
              S.listItem()
              .title("Settings")
              .id("settings")
              .icon(CogIcon)
              .child(
                S.document()
                  .schemaType("settings")
                  .documentId("settings")
              ),
          ])
    }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
})
