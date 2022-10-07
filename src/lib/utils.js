const utils = (module.exports = {})

utils.cleanImage = (image) => {
  const valueToSearch = 'Images'
  const indexOfSearchedValue = (image || '').indexOf(valueToSearch)

  let newImageUrl = ''
  if (indexOfSearchedValue > -1) {
    newImageUrl = 'https://holidayextras.imgix.net/libraryimages' + image.slice(indexOfSearchedValue + valueToSearch.length, image.length) + '?auto=compress&format'
  }
  return newImageUrl.trim()
}
