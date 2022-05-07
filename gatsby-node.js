const { createRemoteFileNode } = require('gatsby-source-filesystem')
const fetch = require('node-fetch')
const { locationCodes } = require('./src/lib/locationCodes')

console.time('Create Holiday Extras GraphQL')

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }, pluginOptions) => {
  const parking = pluginOptions.products.parking
  const hotels = pluginOptions.products.hotels
  const lounges = pluginOptions.products.lounges

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
      let images = product.tripappimages?.split(';')

      // images.forEach((image, index) => {
      //   images[index] = cleanImage(image)
      // })

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
        introduction: product.tripappintroduction,
        images: images,
        keep_keys: product.keep_keys === 1 ? true : false,
        latitude: product.latitude?.toString(),
        logo: {
          url: cleanImage(product.logo)
        },
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
      let images = product.tripappimages?.split(';')
      const nodeData = Object.assign({
        address: product.address,
        airport: locationCodes(product.parent),
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

  processLoungesItems = (productItems) => {
    if (!productItems || !productItems.API_Reply || productItems.API_Reply.Error || productItems.API_Reply.Product.length === 0) return
    const NODE_TYPE = 'HolidayExtrasLounges'
    productItems.API_Reply.Product.forEach((product) => {
      let images = product.tripappimages?.split(';')
      const nodeData = Object.assign({
        adult_age: product.adult_age,
        airport: locationCodes(product.parent),
        check_in_up_to: product.check_in_up_to,
        child_age: product.child_age,
        children_allowed: product.children_allowed,
        closingtime: product.closingtime,
        closingtime_exceptions: product.closingtime_exceptions,
        covid_copy: product.covid_copy,
        covid_secure: product.covid_secure,
        directions: product.directions,
        dresscode: product.dresscode,
        facilitiesdisabled: product.facilitiesdisabled,
        flightannouncements: product.flightannouncements,
        groups: product.groups,
        images: images,
        important_information: product.important_information,
        infant_age: product.infant_age,
        introduction: product.tripappintroduction,
        logo: {
          url: cleanImage(product.logo)
        },
        menu_drinks: product.menu_drinks,
        menu_extras: product.menu_extras,
        menu_food: product.menu_food,
        name: product.tripappaddonname,
        openingtime: product.openingtime,
        productCode: product._prodcode,
        productType: product._prodtype,
        terminal: product.terminal,
        videoid: product.videoid,
        whats_included_drinks: product.whats_included_drinks,
        whats_included_extras: product.whats_included_extras,
        whats_included_food: product.whats_included_food,
        why_bookone: product.why_bookone,
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
      if (type === 'lounges') return processLoungesItems(productItems)
      return null
    })
    return Promise.all(promises)
  }

  await getProducts(parking, 'parking')
  await getProducts(hotels, 'hotels')
  await getProducts(lounges, 'lounges')
}
console.timeEnd('Create Holiday Extras GraphQL')

// Create Local File for Gatsby Image
exports.onCreateNode = async ({ node, actions: { createNode, createNodeField }, createNodeId, getCache }) => {
  if (node.internal.type === 'HolidayExtrasParking' || node.internal.type === 'HolidayExtrasHotels' || node.internal.type === 'HolidayExtrasLounges') {
    if (node.logo.url && !node.logo.url.match(/.(gif)$/i)) {
      const fileNode = await createRemoteFileNode({
        url: node.logo.url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache
      })
      if (fileNode) {
        node.logo.localFile___NODE = fileNode.id
        // createNodeField({ node, name: 'gatsbyImage', value: fileNode.id })
      }
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type HolidayExtrasParking implements Node {
      latitude: String,
      longitude: String,
      terminal: String,
      transfer_latest: String,
      introduction: String,
    }
  `)
}

cleanImage = (image) => {
  const valueToSearch = 'Images'
  const indexOfSearchedValue = (image || '').indexOf(valueToSearch)

  let newImageUrl = ''
  if (indexOfSearchedValue > -1) {
    newImageUrl = 'https://holidayextras.imgix.net/libraryimages' + image.slice(indexOfSearchedValue + valueToSearch.length, image.length)
  }
  return newImageUrl.trim()
}
