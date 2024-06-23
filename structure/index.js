import {BlockContentIcon, ProjectsIcon} from '@sanity/icons'

export const structure = (StructureBuilder) =>
  StructureBuilder.list()
    .id('root')
    .title('Content')
    .items([
      StructureBuilder.documentTypeListItem('project').title('Projects').icon(ProjectsIcon),
      StructureBuilder.documentTypeListItem('sectionContent')
        .title('Section content')
        .icon(BlockContentIcon),
    ])
