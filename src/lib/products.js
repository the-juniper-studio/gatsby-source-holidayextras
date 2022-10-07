const fetch = require('node-fetch')
const processes = require('./processes')

const products = (module.exports = {})

products.get = (productsFoo, type, pluginOptions, createNode, createNodeId, createContentDigest) => {
  const promises = productsFoo.map(async (product) => {
    const productItems = await products.getItems(product, pluginOptions)

    return processes.do(productItems, type, createNode, createNodeId, createContentDigest)
  })

  return Promise.all(promises)
}

products.getItems = (product, pluginOptions) => {
  if (!product) return
  return fetch(
    `https://api.holidayextras.co.uk/v1/product/${product}/lite.js?token=${pluginOptions.token}&key=${pluginOptions.key}${pluginOptions.archived === true && `&archived=1`}${
      pluginOptions.fields && `&fields=${pluginOptions.fields}`
    }`
  )
    .then((result) => result.json())
    .catch((err) => {
      return Promise.resolve([])
    })
}
