import {defineField, defineType} from 'sanity'
import {ProjectsIcon, TaskIcon} from '@sanity/icons'

function capitalizeFirst(string) {
  const capitalizedFirstLetter = string.charAt(0).toUpperCase()
  const otherLetters = string.split()

  otherLetters.splice(0, 1, capitalizedFirstLetter)
  return otherLetters.join('')
}

function addDarkToName(name) {
  return name + '_dark'
}

const typeName = 'project'
const groupText = 'text'
const groupImages = 'images'

const types = {
  string: 'string',
  number: 'number',
  array: 'array',
  image: 'image',
  reference: 'reference',
  url: 'url',
}

const sizes = {
  small: 'small',
  medium: 'medium',
  large1x: 'large1x',
  large2x: 'large2x',
}

export const projectType = defineType({
  name: typeName,
  title: capitalizeFirst(typeName),
  type: 'document',
  icon: TaskIcon,

  preview: {
    select: {
      title: 'name',
      subtitle: 'id',
    },
  },

  groups: [
    {name: groupText, title: capitalizeFirst(groupText), icon: ProjectsIcon},
    {name: groupImages, title: capitalizeFirst(groupImages), icon: ProjectsIcon},
  ],

  fields: [
    defineField({
      name: 'id',
      type: types.number,
      group: groupText,
    }),

    defineField({
      name: 'name',
      type: types.string,
      group: groupText,
    }),

    defineField({
      name: 'link',
      type: types.url,
      group: groupText,
    }),

    defineField({
      name: 'livePage',
      type: types.url,
      group: groupText,
    }),

    defineField({
      name: 'technologies',
      type: types.array,
      group: groupText,
    }),

    defineField({
      name: 'hasDarkVersion',
      // type: types.string,
      options: {
        list: [false, true],
        layout: 'radio',
      },
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
      group: groupText,
    }),

    defineField({
      name: 'stack',
      type: types.string,
      group: groupText,
    }),

    defineField({
      name: 'role',
      type: types.string,
      group: groupText,
    }),

    defineField({
      name: 'customer',
      type: types.string,
      group: groupText,
    }),

    defineField({
      name: 'description',
      type: types.string,
      group: groupText,
    }),

    // Image large2x:

    defineField({
      name: sizes.large2x,
      type: types.image,
      description: 'LIGHT - 1920 x 1080 - Webp - Squoosh optimized',
      group: groupImages,
    }),

    defineField({
      name: addDarkToName(sizes.large2x),
      type: types.image,
      description: 'DARK - 1920 x 1080 - Webp - Squoosh optimized',
      group: groupImages,
      hidden: ({document}) => document?.hasDarkVersion === false,
    }),

    // Image large1x:

    defineField({
      name: sizes.large1x,
      type: types.image,
      description: 'LIGHT - 960 x 540 - Webp - Squoosh optimized',
      group: groupImages,
    }),

    defineField({
      name: addDarkToName(sizes.large1x),
      type: types.image,
      description: 'DARK - 960 x 540 - Webp - Squoosh optimized',
      group: groupImages,
      hidden: ({document}) => document?.hasDarkVersion === false,
    }),

    // Image medium:

    defineField({
      name: sizes.medium,
      type: types.image,
      description: 'LIGHT - 480 x 270 - Webp - Squoosh optimized',
      group: groupImages,
    }),

    defineField({
      name: addDarkToName(sizes.medium),
      type: types.image,
      description: 'DARK - 480 x 270 - Webp - Squoosh optimized',
      group: groupImages,
      hidden: ({document}) => document?.hasDarkVersion === false,
    }),

    // Image small:

    defineField({
      name: sizes.small,
      type: types.image,
      description: 'LIGHT - 370 x 208 - Webp - Squoosh optimized',
      group: groupImages,
    }),

    defineField({
      name: addDarkToName(sizes.small),
      type: types.image,
      description: 'DARK - 370 x 208 - Webp - Squoosh optimized',
      group: groupImages,
      hidden: ({document}) => document?.hasDarkVersion === false,
    }),
  ],
})
