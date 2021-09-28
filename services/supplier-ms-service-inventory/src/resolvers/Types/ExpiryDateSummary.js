const { prisma } = require('../../generated/prisma-client');
const DataLoader = require('dataloader');

const expiryDateSummaryLoader = new DataLoader(async ids => {
  const summaries = await prisma.expiryDateSummaries({ where: { id_in: ids } });
  const map = summaries.reduce((results, summary) => {
    results[summary.id] = summary;
    return results;
  }, {});
  const data = ids.map(id => map[id]);
  console.log('data Loader: ', data);
  return data;
});

const ExpiryDateSummary = {
  __resolveReference({ id }) {
    return expiryDateSummaryLoader.load(id);
  },

  async product({ id }) {
    const data = await prisma.expiryDateSummary({ id });
    return { __typename: 'Product', id: data.productId };
  },

  async items({ id }) {
    const data = await prisma.expiryDateSummary({ id });
    return prisma.inventoryItems({ where: { productId: data.productId, expiryDate: data.expiryDate } });
  },
};

module.exports = {
  ExpiryDateSummary,
};
