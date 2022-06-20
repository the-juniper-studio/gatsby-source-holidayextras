const { createRemoteFileNode } = require('gatsby-source-filesystem')
const products = require('./src/lib/products')
const nodeTypes = require('./src/mapping/nodeTypes.json')

const nodeTypeValues = Object.values(nodeTypes)

const timer = 'Create Holiday Extras GraphQL'

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest, createNodeId }, pluginOptions) => {
  console.time(timer)
  const productKeys = Object.keys(pluginOptions.products) || []
  const promises = productKeys.map(async (productKey) => {
    if (Object.keys(nodeTypes).includes(productKey) && pluginOptions?.products?.[productKey]) {
      await products.get(pluginOptions.products[productKey], productKey, pluginOptions, createNode, createNodeId, createContentDigest)
    }
  })
  await Promise.all(promises)
  console.timeEnd(timer)
}

// Create Local File for Gatsby Image
// exports.onCreateNode = async ({ node, actions: { createNode, createNodeField }, createNodeId, getCache }) => {
//   if (nodeTypeValues.includes(node.internal.type)) {
//     if (node.logo.url && !node.logo.url.match(/.(gif)$/i)) {
//       const fileNode = await createRemoteFileNode({
//         url: node.logo.url,
//         parentNodeId: node.id,
//         createNode,
//         createNodeId,
//         getCache
//       })
//       if (fileNode) {
//         node.logo.localFile___NODE = fileNode.id
//         // createNodeField({ node, name: 'gatsbyImage', value: fileNode.id })
//       }
//     }
//   }
// }

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type HolidayExtrasParking implements Node {
      distance_miles: String,
      latitude: String,
      longitude: String,
      terminal: String,
      transfer_latest: String,
      introduction: String,
    },
    type HolidayExtrasHotels implements Node {
      distance_miles: String,
      latitude: String,
      longitude: String,
    }
  `)
}
