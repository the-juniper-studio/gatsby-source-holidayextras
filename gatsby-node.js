const fetch = require('node-fetch')
const { locationCodes } = require('./libs/locationCodes')

exports.onPreInit = () => console.log('Loaded gatsby-source-holidayextras')

console.time('Create Holiday Extras GraphQL')

const NODE_TYPE = 'HolidayExtras'

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }, pluginOptions) => {
  const products = pluginOptions.products

  getProductItems = (product) => {
    if (!product) return
    return fetch(`https://api.holidayextras.co.uk/v1/product/${product}/lite.js?token=${pluginOptions.token}&key=${pluginOptions.key}${pluginOptions.fields && `&fields=${pluginOptions.fields}`}`)
      .then((result) => result.json())
      .catch((err) => {
        return Promise.resolve([])
      })
  }

  processProductItems = (productItems) => {
    if (!productItems || !productItems.API_Reply || productItems.API_Reply.Error || productItems.API_Reply.Product.length === 0) return
    productItems.API_Reply.Product.forEach((productItem) => {
      const nodeData = Object.assign({
        address: productItem.address,
        airport: locationCodes(productItem.parent),
        children: [],
        id: createNodeId(`${NODE_TYPE}-${productItem._prodcode}`),
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(productItem),
          contentDigest: createContentDigest(productItem)
        },
        latitude: parseFloat(productItem.latitude),
        logo: productItem.logo?.replace('/imageLibrary/Images', 'https://holidayextras.imgix.net/libraryimages'),
        longitude: parseFloat(productItem.longitude),
        name: productItem.tripappcarparkname || productItem.tripapphotelname,
        parent: null,
        productCode: productItem._prodcode,
        type: productItem._prodtype
      })
      createNode(nodeData)
    })
  }
  getProducts = (products) => {
    const promises = products.map(async (product) => {
      const productItems = await getProductItems(product)
      return processProductItems(productItems)
    })
    return Promise.all(promises)
  }
  await getProducts(products)
}
console.timeEnd('Create Holiday Extras GraphQL')
