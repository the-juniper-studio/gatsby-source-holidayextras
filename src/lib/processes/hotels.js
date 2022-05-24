const { getLocationName } = require('./../location')
const { cleanImage } = require('./../utils')
const nodeTypes = require('./../../mapping/nodeTypes.json')

exports.process = (product, images, createNode, createNodeId, createContentDigest) => {
  const nodeData = Object.assign({
    address: product.address,
    airport: getLocationName(product.parent),
    arrival: product.hotel_arrival,
    breakfast: product.breakfast,
    breakfast_price: product.breakfast_price,
    breakfast_times: product.breakfast_times,
    check_in_time: product.check_in_time?.toString(),
    check_out_time: product.check_out_time?.toString(),
    covid_copy: product.covid_copy,
    covid_secure: product.covid_secure === 1 ? true : false,
    depart: product.hotel_depart,
    disabled_facilities: product.disabled_facilities,
    distance_miles: parseInt(product.distance_miles, 10),
    facilities: product.hotel_facilities,
    information: product.information,
    introduction: product.tripappintroduction,
    images: images,
    latitude: product.latitude,
    logo: {
      url: cleanImage(product.logo)
    },
    longitude: product.longitude?.toString(),
    name: product.tripapphotelname,
    noncancellable_nonrefundable: product.noncancellable_nonrefundable === 1 ? true : false,
    on_airport: product.on_airport === 1 ? true : false,
    productCode: product._prodcode,
    productType: product._prodtype,
    restaurant_details: product.restaurant_details,
    star_rating: product.star_rating,
    telephone: product.telephone,
    transfer_earliest: product.transfer_earliest,
    transfer_frequency: product.transfer_frequency?.toString(),
    transfer_latest: product.transfer_latest?.toString(),
    transfer_price: product.transfer_price?.toString(),
    transfer_story: product.tripapptransferstory,
    transfer_time: product.transfer_time?.toString(),
    sellpoint1: product.tripappsellpoint1,
    videoid: product.videoid,
    // required fields
    children: [],
    id: createNodeId(`${nodeTypes.hotels}-${product._prodcode}`),
    internal: {
      type: nodeTypes.hotels,
      content: JSON.stringify(product),
      contentDigest: createContentDigest(product)
    },
    parent: null
  })

  createNode(nodeData)
}
