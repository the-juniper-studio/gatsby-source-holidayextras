const locationCodes = require('./../mapping/locationCodes.json')

exports.getLocationName = (locationCode) => {
  const shortLocationCode = locationCode.slice(0, -1)

  if (shortLocationCode in locationCodes) {
    return locationCodes[shortLocationCode]
  }

  return null
}
