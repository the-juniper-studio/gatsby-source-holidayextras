const { getLocationName } = require('./../location')
const { cleanImage } = require('./../utils')
const nodeTypes = require('./../../mapping/nodeTypes.json')

exports.process = (product, images, createNode, createNodeId, createContentDigest) => {
  const nodeData = Object.assign({
    address: product.address,
    advance_purchase: product.advance_purchase === 1 ? true : false,
    airport: getLocationName(product.parent),
    arrival_procedures: product.arrival_procedures,
    covid_copy: product.covid_copy,
    covid_secure: product.covid_secure,
    departure_procedures: product.departure_procedures,
    directions: product.directions,
    disabled_facilities: product.disabled_facilities,
    distance_miles: product.distance_miles,
    has_electric_charging: product.has_electric_charging === 1 ? true : false,
    information: product.information,
    introduction: product.tripappintroduction,
    images: images,
    keep_keys: product.keep_keys === 1 ? true : false,
    last_update: product._updated_date,
    latitude: product.latitude?.toString(),
    logo: cleanImage(product.logo),
    longitude: product.longitude?.toString(),
    maximum_car_size: product.maximum_car_size,
    meet_and_greet: product.meet_and_greet === 1 ? true : false,
    name: product.tripappcarparkname,
    on_airport: product.on_airport === 1 ? true : false,
    productCode: product._prodcode,
    productType: product._prodtype,
    security_measures: product.security_measures,
    sellpoint: product.tripappcarparksellpoint,
    story: product.tripappcarparkstory,
    telephone: product.telephone,
    terminal: product.terminal?.toString(),
    transfer_earliest: product.transfer_earliest?.toString(),
    transfer_frequency: product.transfer_frequency?.toString(),
    transfer_latest: product.transfer_latest?.toString(),
    transfer_time: product.transfer_time?.toString(),
    transfertip: product.tripapptransfertip,
    videoid: product.videoid,
    // required fields
    children: [],
    id: createNodeId(`${nodeTypes.parking}-${product._prodcode}`),
    internal: {
      type: nodeTypes.parking,
      content: JSON.stringify(product),
      contentDigest: createContentDigest(product)
    },
    parent: null
  })

  createNode(nodeData)
}
