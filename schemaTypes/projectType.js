import {defineField, defineType} from 'sanity'
import {ProjectsIcon, DocumentTextIcon, ImagesIcon} from '@sanity/icons' // https://icons.sanity.build/all
import {constants} from '../constants'
import {composeOptionsList, messages, uppercaseFirst} from '../services'

const {types, projectTypes} = constants
const {requiredErrMsg, mustBeInteger, mustBeGreaterThanZero} = messages

const typeName = 'project'
const groupText = 'text'
const groupImages = 'images'

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
          .error(mustBeInteger)
          .positive(mustBeGreaterThanZero),
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
      title: 'Does have a dark version?',
      type: types.boolean,
      initialValue: true,
      options: {layout: 'checkbox'},
      description: 'Whether this image also has a dark version (true or false)',
      group: groupText,
    }),

    defineField({
      name: 'type',
      title: 'Project type',
      type: types.string,
      options: {
        list: composeOptionsList(projectTypes),
        layout: 'radio',
      },
      group: groupText,
    }),

    defineField({
      name: 'stack',
      type: types.array,
      of: [{type: types.string}],
      options: {
        list: [
          {title: 'Front-end', value: 'Front-end'},
          {title: 'Back-end', value: 'Back-end'},
        ],
      },
      initialValue: ['Front-end'],
      group: groupText,
    }),

    defineField({
      name: 'isRole',
      title: 'Whether I had a specific role in this project',
      type: types.boolean,
      // options: {layout: 'checkbox'},
      initialValue: false,
      description:
        'If left unchecked, the "role" field will be disabled and its value will default to an empty array',
      group: groupText,
    }),

    defineField({
      name: 'role',
      type: types.array,
      of: [{type: types.string}],
      options: {
        list: [
          {title: 'Team member', value: 'teamMember'},
          {title: 'Team lead', value: 'teamLead'},
          {title: 'Repository owner', value: 'repoOwner'},
        ],
      },
      initialValue: [],
      readOnly: ({document}) => {
        return document?.isRole === false
      },
      group: groupText,
    }),

    defineField({
      name: 'customer',
      type: types.string,
      initialValue: '',
      description: 'Not required. Can be left blank',
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
      description: 'PNG, 1920 * 1080, non-optimized',
      fields: [
        {
          name: 'light',
          title: 'Light image',
          type: types.image,
        },
        {
          name: 'dark',
          title: 'Dark image',
          type: types.image,
          hidden: ({document}) => document?.hasDarkVersion === false,
        },
      ],
      group: groupImages,
    }),
  ],
})
