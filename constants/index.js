const types = {
  string: 'string',
  number: 'number',
  array: 'array',
  object: 'object',
  boolean: 'boolean',
  image: 'image',
  text: 'text',
  reference: 'reference',
  url: 'url',
}

const sizes = {
  small: 'small',
  medium: 'medium',
  large1x: 'large1x',
  large2x: 'large2x',
}

const res = {
  small: '370 x 208',
  medium: '480 x 270',
  large1x: '960 x 540',
  large2x: '1920 x 1080',
}

const theme = {
  light: 'LIGHT',
  dark: 'DARK',
}

const projTypes = {
  commercial: {
    en: 'Commercial project',
    uk: 'Комерційний проект',
  },
  pet: {
    en: 'Pet project',
    uk: 'Пет-проект',
  },
  test: {
    en: 'Test',
    uk: 'Тестове завдання',
  },
  study: {
    en: 'Study project',
    uk: 'Навчальний проект',
  },
}

export const constants = {types, sizes, res, theme, projTypes}
