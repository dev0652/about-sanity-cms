import {defineField, defineType} from 'sanity'
import {ProjectsIcon, DocumentTextIcon, ImagesIcon} from '@sanity/icons' // https://icons.sanity.build/all
import {constants} from '../constants'

const {types, sizes, res, theme, projTypes} = constants
const typeName = 'project'
const groupText = 'text'
const groupImages = 'images'
const requiredErrMsg = 'Required'
const imageReminder = 'Webp, Squoosh optimized (lossless)'
const versionDark = true

export const projectType = defineType({
  name: typeName,
  title: uppercaseFirst(typeName),
  type: 'document',
  icon: ProjectsIcon,

  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
  },

  groups: [
    {name: groupText, title: uppercaseFirst(groupText), icon: DocumentTextIcon},
    {name: groupImages, title: uppercaseFirst(groupImages), icon: ImagesIcon},
  ],

  fields: [
    defineField({
      name: 'id',
      type: types.number,
      group: groupText,
      validation: (rule) =>
        rule
          .required()
          .error(requiredErrMsg)
          .integer()
          .error('Must be an integer')
          .positive('Must be greater than zero'),
    }),

    defineField({
      name: 'name',
      title: 'Project name',
      type: types.string,
      group: groupText,
      validation: (rule) => rule.required().error(requiredErrMsg),
    }),

    defineField({
      name: 'link',
      type: types.url,
      title: 'GitHub link',
      description: 'Link to project repo (e.g., GitHub)',
      group: groupText,
    }),

    defineField({
      name: 'livePage',
      type: types.url,
      title: 'Live page link',
      description: 'Link to project live page',
      group: groupText,
    }),

    defineField({
      name: 'technologies',
      type: types.array,
      of: [{type: types.string}],
      initialValue: ['HTML', 'SaSS', 'JavaScript', 'Git'],
      group: groupText,
    }),

    defineField({
      name: 'hasDarkVersion',
      title: 'has dark version',
      type: types.boolean,
      initialValue: false,
      options: {layout: 'checkbox'},
      description: 'Whether this image also has a dark version',
      group: groupText,
    }),

    defineField({
      name: 'thumbFileName',
      type: types.string,
      group: groupText,
    }),

    defineField({
      name: 'type',
      type: types.string,

      options: {
        list: [projTypes.commercial.en, projTypes.pet.en, projTypes.test.en, projTypes.study.en],
        layout: 'radio',
      },

      group: groupText,
    }),

    defineField({
      name: 'stack',
      type: types.string,
      options: {
        list: ['Front-end', 'Back-end', 'Front-end, Back-end'],
        layout: 'radio',
      },
      initialValue: 'Front-end',
      group: groupText,
    }),

    defineField({
      name: 'role',
      type: types.object,
      options: {columns: 2},
      fields: [
        {name: 'en', type: types.string, title: 'English'},
        {name: 'uk', type: types.string, title: 'Ukrainian'},
      ],
      initialValue: null,
      group: groupText,
    }),

    defineField({
      name: 'customer',
      type: types.string,
      initialValue: null,
      group: groupText,
    }),

    defineField({
      name: 'description',
      type: types.object,
      options: {
        columns: 2,
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {name: 'en', type: types.text, title: 'in English'},
        {name: 'uk', type: types.text, title: 'in Ukrainian'},
      ],
      group: groupText,
      validation: (rule) => rule.required().error(requiredErrMsg),
    }),

    defineField({
      name: 'images',
      title: `Project screenshots`,
      type: types.object,
      description: imageReminder,
      fieldsets: [
        {
          name: 'imgFieldSet',
          title: 'Original + deretinized images',
          options: {collapsible: true, collapsed: false},
        },
      ],
      fields: [
        defineField(composeImageField(sizes.large2x)),
        defineField(composeImageField(sizes.large2x, versionDark)),

        defineField(composeImageField(sizes.large1x)),
        defineField(composeImageField(sizes.large1x, versionDark)),

        defineField(composeImageField(sizes.medium)),
        defineField(composeImageField(sizes.medium, versionDark)),

        defineField(composeImageField(sizes.small)),
        defineField(composeImageField(sizes.small, versionDark)),
      ],
      group: groupImages,
    }),
  ],
})

function uppercaseFirst(word) {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

function addDarkToName(name) {
  return name + '_dark'
}

function composeImageField(size, isDark = false, fieldSet = 'imgFieldSet') {
  const hiddenIfNoDarkVersion = ({document}) => document?.hasDarkVersion === false

  return {
    name: isDark ? addDarkToName(sizes[size]) : sizes[size],
    title: isDark ? `${sizes[size]} (${res[size]}) ${theme.dark}` : sizes[size],
    type: types.image,
    fieldset: fieldSet,
    hidden: isDark ? hiddenIfNoDarkVersion : false,
  }
}
