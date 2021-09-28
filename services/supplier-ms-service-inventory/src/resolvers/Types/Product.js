const DataLoader = require('dataloader');
const { prisma } = require('../../generated/prisma-client');

const expiryDateSummariesLoader = new DataLoader(async (productIds) => {
  const items = await prisma.expiryDateSummaries({ where: { productId_in: productIds } });
  const map = items.reduce((results, item) => {
    if (!results[item.productId]) {
      results[item.productId] = [];
    }
    results[item.productId].push(item);
    return results;
  }, {});
  return productIds.map(productId => map[productId] || []);
});

const inventoryItemsLoader = new DataLoader(async (productIds) => {
  const items = await prisma.inventoryItems({ where: { productId_in: productIds } });
  const map = items.reduce((results, item) => {
    if (!results[item.productId]) {
      results[item.productId] = [];
    }
    results[item.productId].push(item);
    return results;
  }, {});
  return productIds.map(productId => map[productId] || []);
});

const warehouseSummariesLoader = new DataLoader(async (productIds) => {
  const items = await prisma.warehouseSummaries({ where: { productId_in: productIds } });
  const map = items.reduce((results, item) => {
    if (!results[item.productId]) {
      results[item.productId] = [];
    }
    results[item.productId].push(item);
    return results;
  }, {});
  return productIds.map(productId => map[productId] || []);
});

const productSummaryLoader = new DataLoader(async productIds => {
  const items = await prisma.productSummaries({ where: { productId_in: productIds } });
  const map = items.reduce((results, item) => {
    results[item.productId] = item;
    return results;
  }, {});
  return productIds.map(productId => map[productId] || null);
})


const Product = {
  async quantity({ id }, args) {
    const summary = await productSummaryLoader.load(id);
    productSummaryLoader.clearAll()
    return summary ? summary.quantity : 0;
  },
  async incomingQuantity({ id }, args) {
    const summary = await productSummaryLoader.load(id);
    productSummaryLoader.clearAll()
    return summary ? summary.incomingQuantity : 0;
  },
  async outgoingQuantity({ id }, args) {
    const summary = await productSummaryLoader.load(id);
    productSummaryLoader.clearAll()
    return summary ? summary.outgoingQuantity : 0;
  },

  warehouseSummaries({ id }, args) {
    const summary = warehouseSummariesLoader.load(id);
    warehouseSummariesLoader.clearAll()
    return summary;
  },

  expiryDateSummaries({ id }, args) {
    const summary = expiryDateSummariesLoader.load(id);
    expiryDateSummariesLoader.clearAll()
    return summary;
  },

  inventoryItems({ id }, args) {
    const items = inventoryItemsLoader.load(id);
    inventoryItemsLoader.clearAll()
    return items;
  }
};

module.exports = {
  Product,
};
