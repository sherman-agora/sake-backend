const { prisma } = require('../../generated/prisma-client');

const generateItem = async product => {
  console.log(product);
  return await Promise.all(
    [...Array(product.quantity).keys()].map(() =>
      prisma.createInventoryItem({
        poId: product.poId,
        expiryDay: product.expiryDate,
        name: product.name,
        brand: product.brand,
        sku: product.sku,
        cost: product.cost,
      })
    )
  );
};

const warehouseManagement = {
  async inWarehouse(parent, { data }, { prisma, producer }) {
    console.log('inWarehouse', data);
    const inventoryItems = await Promise.all(data.map(d => prisma.createInventoryItem(d)));

    // sum up products data
    const productsData = data.reduce((results, d) => {
      const productId = d.productId;
      const i = results.findIndex(r => r.productId === productId);
      if (i === -1) {
        results.push({
          productId,
          quantity: 1,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        results[i].quantity += 1;
      }
      return results;
    }, []);
    console.log('productsData', productsData);

    // update products
    await Promise.all(
      productsData.map(async productData => {
        const product = await prisma.inventoryProduct({ id: productData.productId });
        return prisma.updateInventoryProduct({
          where: { id: productData.productId },
          data: {
            quantity: product.quantity + productData.quantity,
          },
        });
      })
    );

    // sum up summaries data
    const summariesData = data.reduce((results, d) => {
      const productId = d.productId;
      const warehouseId = d.warehouse.connect.id;
      const i = results.findIndex(r => r.productId === productId && r.warehouseId === warehouseId);
      if (i === -1) {
        results.push({
          productId,
          warehouseId,
          quantity: 1,
        });
      } else {
        // eslint-disable-next-line no-param-reassign
        results[i].quantity += 1;
      }
      return results;
    }, []);
    console.log('summariesData', summariesData);

    // update summary
    await Promise.all(
      summariesData.map(async summaryData => {
        const summary = await prisma.inventorySummaries({
          where: {
            warehouse: { id: summaryData.warehouseId },
            product: { id: summaryData.productId },
          },
        });
        if (summary.length === 0) {
          return prisma.createInventorySummary({
            warehouse: { connect: { id: summaryData.warehouseId } },
            product: { connect: { id: summaryData.productId } },
            quantity: summaryData.quantity,
          });
        } else {
          return prisma.updateInventorySummary({
            where: { id: summary.id },
            data: {
              quantity: parseInt(summary.quantity, 10) + summaryData.quantity,
            },
          });
        }
      })
    );

    producer(
      {
        topic: 'WarehouseIn',
        message: data,
      },
    );
    return inventoryItems;
  },
  async outWarehouse(parent, { data }, { prisma, producer }) {
    const results = await prisma.updateInventoryWarehouse({
      where: { name: data.whName },
      data: {
        products: { disconnect: data.inventoryItems },
      },
    });
    producer(
      {
        topic: 'WarehouseOut',
        message: data,
      },
    );
    return results;
  },

  async transferWarehouse(parent, { data }, { prisma, producer }) {
    // 1. get inventoryItems from database
    // 2. calculate warehouse quantity that need to minus
    // 3. change inventoryItems' warehouse to toWH
    // 4. add toWH quantity

    const transfer = data.inventoryItemIds.reduce(async (pre, id, index) => {
      await pre;
      if (!data.fromWarehouseIds[index]) {
        return;
      }
      console.log('id', id);
      console.log('index', index);

      const temp = await prisma.updateInventoryItem({
        where: { id },
        data: {
          warehouse: {
            connect: {
              id: data.toWarehouseId,
            },
          },
        },
      });

      const { productId } = await prisma.inventoryItem({ id });
      console.log('productid: ', productId);

      const warehouseSummaries = await prisma.warehouseSummaries({
        where: { productId, warehouse: { id: data.fromWarehouseIds[index] } },
      });
      const fromWarehouseInfo = await prisma.warehouse({ id: data.fromWarehouseIds[index] });
      console.log('fromWarehouseInfo: ', fromWarehouseInfo);

      //update new summary
      console.log('data.toWarehouseId: ', data.toWarehouseId);
      const toWarehouseSummaries = await prisma.warehouseSummaries({
        where: { productId, warehouse: { id: data.toWarehouseId } },
      });
      console.log('toWarehouseSummaries: ', toWarehouseSummaries);
      const toWarehouseInfo = await prisma.warehouse({ id: data.toWarehouseId });

      // handle quantity in warehouse, if "dispose" or "out" to normal --> +1 quantity;
      // if normal --> dispose or out --> -1 quantity

      if (fromWarehouseInfo.type === 'DISPOSE' || fromWarehouseInfo.type === 'OUT') {
        if (toWarehouseInfo.type != 'DISPOSE' || toWarehouseInfo.type != 'OUT') {
          console.log('+1 here');
          const productSummary = await prisma.productSummary({ productId });
          await prisma.updateProductSummary({
            where: { productId },
            data: { quantity: productSummary.quantity + 1 },
          });
        }
      } else {
        if (toWarehouseInfo.type == 'DISPOSE' || toWarehouseInfo.type == 'OUT') {
          console.log('-1 here');
          const productSummary = await prisma.productSummary({ productId });
          await prisma.updateProductSummary({
            where: { productId },
            data: { quantity: productSummary.quantity - 1 },
          });
        }
      }

      console.log('warehouseSummaries: ', warehouseSummaries);
      console.log('toWarehouseSummaries', toWarehouseSummaries);
      const updateOld = await prisma.updateWarehouseSummary({
        where: { id: warehouseSummaries[0].id },
        data: {
          quantity: warehouseSummaries[0].quantity - 1,
        },
      });

      if (toWarehouseSummaries.length === 0) {
        pre[index] = await prisma.createWarehouseSummary({
          warehouse: { connect: { id: data.toWarehouseId } },
          productId,
          quantity: 1,
        });
        return pre;
      } else {
        pre[index] = await prisma.updateWarehouseSummary({
          where: { id: toWarehouseSummaries[0].id },
          data: {
            quantity: toWarehouseSummaries[0].quantity + 1,
          },
        });
        return pre;
      }
    }, {});
    return data.inventoryItemIds.map((ids, index) => transfer[index]);
  },
};

module.exports = { warehouseManagement };
