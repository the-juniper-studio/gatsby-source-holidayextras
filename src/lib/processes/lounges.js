const { getLocationName } = require('./../location')
const { cleanImage } = require('./../utils')
const nodeTypes = require('./../../mapping/nodeTypes.json')

exports.process = (product, images, createNode, createNodeId, createContentDigest) => {
  const nodeData = Object.assign({
    adult_age: product.adult_age,
    airport: getLocationName(product.parent),
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
    name: product.tripappaddonname || product.name,
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
    id: createNodeId(`${nodeTypes.lounges}-${product._prodcode}`),
    internal: {
      type: nodeTypes.lounges,
      content: JSON.stringify(product),
      contentDigest: createContentDigest(product)
    },
    parent: null
  })

  createNode(nodeData)
}
