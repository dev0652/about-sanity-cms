import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',

  projectId: 'ik2t7qlr',
  dataset: 'projects',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
