const DataLoader = require('dataloader');
const { prisma } = require('../../generated/prisma-client');

const shippingItemsLoader = new DataLoader(async productIds => {
  const items = await prisma.shippingItems({ where: { productId_in: productIds } });
  const map = items.reduce((results, item) => {
    if (!results[item.productId]) {
      results[item.productId] = [];
    }
    results[item.productId].push(item);
    return results;
  }, {});
  return productIds.map(productId => map[productId] || []);
});

const Product = {
  async shippingItems({ id }) {
    return shippingItemsLoader.load(id);
  },
}

module.exports = {
  Product,
}
