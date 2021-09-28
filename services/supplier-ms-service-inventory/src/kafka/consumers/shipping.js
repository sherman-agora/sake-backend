const _ = require('lodash');
const { numberAfter } = require('../../utils/sequentialNumber');
const producer = require('../producer');

const { prisma } = require('../../generated/prisma-client');

function chunkArray(myArray, chunk_size) {
  var index = 0;
  var arrayLength = myArray.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}

const updateProductSummary = async items => {
  console.log('updating the product summary.....', items.length);
  const summaries = await items.reduce(async (pre, { quantity, productId, expectedQuantity }) => {
    await pre;
    if (!productId) {
      return;
    }
    const productSummary = await prisma.productSummary({ productId });
    console.log('productSummary: ', productSummary);
    if (!productSummary) {
      // Should not happen
      return prisma.createProductSummary({
        productId,
        incomingQuantity: 0,
        outgoingQuantity: 0,
        quantity,
      });
    }

    return prisma.updateProductSummary({
      where: { id: productSummary.id },
      data: {
        incomingQuantity: productSummary.incomingQuantity - quantity,
        quantity: productSummary.quantity + quantity,
      },
    });
  }, []);
  return summaries;
};

const updateWarehouseSummary = async items => {
  console.log('updating the warehouse summary');
  const summaries = await items.reduce(async (pre, { quantity, productId, warehouseId }) => {
    await pre;
    if (!warehouseId) {
      return;
    }
    const warehouseSummaries = await prisma.warehouseSummaries({
      where: { productId, warehouse: { id: warehouseId } },
    });
    if (warehouseSummaries.length === 0) {
      return prisma.createWarehouseSummary({
        warehouse: { connect: { id: warehouseId } },
        productId,
        quantity,
      });
    }
    const updatedSummary = await prisma.updateWarehouseSummary({
      where: { id: warehouseSummaries[0].id },
      data: {
        quantity: warehouseSummaries[0].quantity + quantity,
      },
    });
    return updatedSummary;
  }, []);
  return summaries;
};

const updateExpirySummary = async items => {
  console.log('updating expiry summary....');
  return Promise.all(
    items.map(async ({ quantity, productId, expiryDate }) => {
      if (!expiryDate) {
        return;
      }
      const expiryDateSummaries = await prisma.expiryDateSummaries({ where: { productId, expiryDate } });
      if (expiryDateSummaries.length === 0) {
        return prisma.createExpiryDateSummary({
          expiryDate,
          productId,
          quantity,
        });
      }
      return prisma.updateExpiryDateSummary({
        where: { id: expiryDateSummaries[0].id },
        data: {
          quantity: expiryDateSummaries[0].quantity + quantity,
        },
      });
    })
  );
};

const generateInventoryItems = async (items, purchaseOrderId) => {
  console.log('generating item...');
  const warehouseProducts = items.reduce(
    (results, { quantity, price, expiryDate, warehouseId, productId, labelFrom }) => {
      let labels;
      if (!labelFrom) {
        labels = _.range(quantity).map(() => '');
      } else {
        labels = _.range(quantity - 1).reduce(
          (results, i) => {
            const nextNumber = numberAfter(results[results.length - 1]);
            return [...results, nextNumber];
          },
          [labelFrom]
        );
      }

      if (!results[warehouseId]) {
        results[warehouseId] = [];
      }
      const inventoryItems = labels.map(label => ({
        productId,
        purchaseOrderId,
        expiryDate,
        label,
        cost: price,
      }));
      results[warehouseId] = [...results[warehouseId], ...inventoryItems];
      return results;
    },
    {}
  );

  // updateWarehouse so that we have createManyInventoryItem
  return await Promise.all(
    Object.keys(warehouseProducts).map(warehouseId => {
      const products = warehouseProducts[warehouseId];
      if (products.length > 50) {
        console.log('item is more then 50 start to split arry');
        const splitResults = chunkArray(products, 50);
        const results = splitResults.reduce(async (pre, items, index) => {
          await pre;
          console.log('array index: ', index);
          console.log('array items: ', items.length);
          console.log('warehouse Id...: ', warehouseId);

          const results = await prisma.updateWarehouse({
            where: { id: warehouseId },
            data: {
              products: {
                create: items,
              },
            },
          });
          await new Promise(resolve => setTimeout(resolve, 5000));
          console.log('results done ', index);
          return results;
        }, {});
        return results;
      } else {
        return prisma.updateWarehouse({
          where: { id: warehouseId },
          data: {
            products: {
              create: products,
            },
          },
        });
      }
    })
  );
};

const shipping = {
  async whenShippingCreated({ data }) {
    return Promise.all([
      await updateProductSummary(data.products),
      await updateWarehouseSummary(data.products),
      await updateExpirySummary(data.products),
      await generateInventoryItems(data.products, data.purchaseOrderId),
    ]).then(() => {
      producer(
        {
          topic: 'ProductUpdate',
          message: { where: { id: data.products.map(product => product.productId) } },
        },
      );
    });
  },

  async whenShippingUpdated({ prevData, data }) {
    // TODO: don't know how to handle it
  },

  async whenShippingDeleted({ data }) {
    // TODO: don't know how to handle it
  },
};

module.exports = {
  shipping,
};
