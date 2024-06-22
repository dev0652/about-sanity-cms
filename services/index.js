export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.substring(1)
}

export function composeOptionsList(object) {
  let listItems = []
  for (const key in object) {
    listItems.push({title: object[key].en, value: key})
  }
  return listItems
}

export const messages = {
  requiredErrMsg: 'Required',
  mustBeInteger: 'Must be an integer',
  mustBeGreaterThanZero: 'Must be greater than zero',
}
