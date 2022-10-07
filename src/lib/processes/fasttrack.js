const { getLocationName } = require('./../location')
const { cleanImage } = require('./../utils')
const nodeTypes = require('./../../mapping/nodeTypes.json')

exports.process = (product, images, createNode, createNodeId, createContentDigest) => {
  const nodeData = Object.assign({
    access_pass_image: cleanImage(product.access_pass_image),
    airport: getLocationName(product.parent),
    extra_information: product.extra_information,
    images: images,
    is_noncancellable: product.is_noncancellable,
    last_update: product._updated_date,
    logo: {
      url: cleanImage(product.logo)
    },
    name: product.tripappaddonname,
    productCode: product._prodcode,
    productType: product._prodtype,
    // required fields
    children: [],
    id: createNodeId(`${nodeTypes.fasttrack}-${product._prodcode}`),
    internal: {
      type: nodeTypes.fasttrack,
      content: JSON.stringify(product),
      contentDigest: createContentDigest(product)
    },
    parent: null
  })

  createNode(nodeData)
}
