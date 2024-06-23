import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons' // https://icons.sanity.build/all
import {constants} from '../constants'
import {messages, uppercaseFirst} from '../services'

const {types} = constants
const {requiredErrMsg} = messages
const typeName = 'sectionContent'

export const sectionContentType = defineType({
  name: typeName,
  title: uppercaseFirst(typeName),
  type: 'document',
  icon: BlockContentIcon,

  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
  },

  fields: [
    defineField({
      name: 'name',
      // title: '"About me" section',
      type: types.string,
      validation: (rule) => rule.required().error(requiredErrMsg),
    }),

    defineField({
      name: 'aboutMe',
      title: 'About me',
      type: types.object,
      options: {
        // columns: 2,
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {name: 'en', type: types.array, of: [{type: types.block}], title: 'in English'},
        {name: 'uk', type: types.array, of: [{type: types.block}], title: 'in Ukrainian'},
      ],
      validation: (rule) => rule.required().error(requiredErrMsg),
    }),
  ],
})
