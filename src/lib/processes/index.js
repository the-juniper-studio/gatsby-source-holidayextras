const { cleanImage } = require('./../utils')
const processes = {
  fasttrack: require('./fasttrack'),
  hotels: require('./hotels'),
  lounges: require('./lounges'),
  parking: require('./parking')
}

exports.do = (productItems, processType, createNode, createNodeId, createContentDigest) => {
  if (!productItems || !productItems.API_Reply || productItems.API_Reply.Error || productItems.API_Reply.Product.length === 0) return

  productItems.API_Reply.Product.forEach((product) => {
    let images = product.tripappimages?.split(';') || product.tripappaddonimages?.split(';')
    if (images) {
      images.forEach((image, index) => {
        images[index] = cleanImage(image)
      })
    }

    if (!processType in processes) return null

    processes[processType].process(product, images, createNode, createNodeId, createContentDigest)
  })
}
