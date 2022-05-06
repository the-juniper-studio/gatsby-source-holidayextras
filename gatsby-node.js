const fetch = require('node-fetch')
const { locationCodes } = require('./libs/locationCodes')

console.time('Create Holiday Extras GraphQL')

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }, pluginOptions) => {
  const parking = pluginOptions.products.parking
  const hotels = pluginOptions.products.hotels

  getProductItems = (product) => {
    if (!product) return
    return fetch(`https://api.holidayextras.co.uk/v1/product/${product}/lite.js?token=${pluginOptions.token}&key=${pluginOptions.key}${pluginOptions.fields && `&fields=${pluginOptions.fields}`}`)
      .then((result) => result.json())
      .catch((err) => {
        return Promise.resolve([])
      })
  }

  processParkingItems = (productItems) => {
    if (!productItems || !productItems.API_Reply || productItems.API_Reply.Error || productItems.API_Reply.Product.length === 0) return
    const NODE_TYPE = 'HolidayExtrasParking'
    productItems.API_Reply.Product.forEach((product) => {
      const images = product.tripappimages?.replaceAll('/imageLibrary/Images', 'https://holidayextras.imgix.net/libraryimages').split(';')
      const nodeData = Object.assign({
        address: product.address,
        advance_purchase: product.advance_purchase === 1 ? true : false,
        airport: locationCodes(product.parent),
        arrival_procedures: product.arrival_procedures,
        covid_copy: product.covid_copy,
        covid_secure: product.covid_secure,
        departure_procedures: product.departure_procedures,
        directions: product.directions,
        disabled_facilities: product.disabled_facilities,
        distance_miles: parseInt(product.distance_miles, 10),
        has_electric_charging: product.has_electric_charging === 1 ? true : false,
        information: product.information,
        keep_keys: product.keep_keys === 1 ? true : false,
        latitude: parseFloat(product.latitude),
        logo: product.logo?.replace('/imageLibrary/Images', 'https://holidayextras.imgix.net/libraryimages'),
        longitude: parseFloat(product.longitude),
        maximum_car_size: product.maximum_car_size,
        meet_and_greet: product.meet_and_greet === 1 ? true : false,
        name: product.tripappcarparkname,
        on_airport: product.on_airport === 1 ? true : false,
        productCode: product._prodcode,
        productType: product._prodtype,
        security_measures: product.security_measures,
        telephone: product.telephone,
        terminal: product.terminal?.toString(),
        transfer_earliest: product.transfer_earliest,
        transfer_frequency: parseInt(product.transfer_frequency, 10),
        transfer_latest: product.transfer_latest?.toString()?.replace(':', '.'),
        transfer_time: parseInt(product.transfer_time, 10),
        tripappcarparkname: product.tripappcarparkname,
        tripappcarparksellpoint: product.tripappcarparksellpoint,
        tripappcarparkstory: product.tripappcarparkstory,
        tripappimages: images,
        tripappintroduction: product.transfer_latest?.toString(),
        tripapptransfertip: product.tripapptransfertip,
        videoid: product.videoid,
        // required fields
        children: [],
        id: createNodeId(`${NODE_TYPE}-${product._prodcode}`),
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(product),
          contentDigest: createContentDigest(product)
        },
        parent: null
      })
      createNode(nodeData)
    })
  }

  processHotelsItems = (productItems) => {
    if (!productItems || !productItems.API_Reply || productItems.API_Reply.Error || productItems.API_Reply.Product.length === 0) return
    const NODE_TYPE = 'HolidayExtrasHotels'
    productItems.API_Reply.Product.forEach((product) => {
      const images = product.tripappimages?.replaceAll('/imageLibrary/Images', 'https://holidayextras.imgix.net/libraryimages').split(';')
      const nodeData = Object.assign({
        address: product.address,
        // advance_purchase: product.advance_purchase === 1 ? true : false,
        airport: locationCodes(product.parent),
        // arrival_procedures: product.arrival_procedures,
        // covid_copy: product.covid_copy,
        // covid_secure: product.covid_secure,
        // departure_procedures: product.departure_procedures,
        // directions: product.directions,
        // disabled_facilities: product.disabled_facilities,
        // distance_miles: parseInt(product.distance_miles, 10),
        // has_electric_charging: product.has_electric_charging === 1 ? true : false,
        // information: product.information,
        // keep_keys: product.keep_keys === 1 ? true : false,
        latitude: parseFloat(product.latitude),
        logo: product.logo?.replace('/imageLibrary/Images', 'https://holidayextras.imgix.net/libraryimages'),
        longitude: parseFloat(product.longitude),
        // maximum_car_size: product.maximum_car_size,
        // meet_and_greet: product.meet_and_greet === 1 ? true : false,
        name: product.tripapphotelname,
        // on_airport: product.on_airport === 1 ? true : false,
        productCode: product._prodcode,
        productType: product._prodtype,
        // security_measures: product.security_measures,
        // telephone: product.telephone,
        // terminal: product.terminal?.toString(),
        // transfer_earliest: product.transfer_earliest,
        // transfer_frequency: parseInt(product.transfer_frequency, 10),
        // transfer_latest: product.transfer_latest?.toString()?.replace(':', '.'),
        // transfer_time: parseInt(product.transfer_time, 10),
        // tripappcarparkname: product.tripappcarparkname,
        // tripappcarparksellpoint: product.tripappcarparksellpoint,
        // tripappcarparkstory: product.tripappcarparkstory,
        // tripappimages: images,
        // tripappintroduction: product.transfer_latest?.toString(),
        // tripapptransfertip: product.tripapptransfertip,
        // videoid: product.videoid,
        // required fields
        children: [],
        id: createNodeId(`${NODE_TYPE}-${product._prodcode}`),
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(product),
          contentDigest: createContentDigest(product)
        },
        parent: null
      })
      createNode(nodeData)
    })
  }

  getProducts = (products, type) => {
    const promises = products.map(async (product) => {
      const productItems = await getProductItems(product)
      if (type === 'parking') return processParkingItems(productItems)
      if (type === 'hotels') return processHotelsItems(productItems)
      return null
    })
    return Promise.all(promises)
  }

  await getProducts(parking, 'parking')
  await getProducts(hotels, 'hotels')
}
console.timeEnd('Create Holiday Extras GraphQL')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type HolidayExtras implements Node {
      transfer_latest: String,
      tripappintroduction: String
    }
  `
  createTypes(typeDefs)
}
