const { prisma } = require('../../generated/prisma-client');

const deliveryNote = {
  async deliveryItem(data) {
    console.log('deliveryData: ', data);
    const inventoryItems = await Promise.all(
      data.items.reduce(async (pre, item) => {
        await pre;
        console.log('item', item);
        const summary = await prisma.productSummary({ productId: item.productId });
        console.log('product summary: ', summary);
        const updateSummary = await prisma.updateProductSummary({
          where: { id: summary.id },
          data: {
            outgoingQuantity: summary.outgoingQuantity - 1,
          },
        });
        const getWarehouse = await prisma.warehouses({ where: { products_some: { id: item.itemId } } });
        console.log('getWarehouse', getWarehouse);
        const warehouseSummary = await prisma.warehouseSummaries({
          where: { productId: item.productId, warehouse: getWarehouse.id },
        });
        console.log('warehouseSummary', warehouseSummary);
        const updateOldWarehouseSummary = await prisma.updateWarehouseSummary({
          where: { id: warehouseSummary[0].id },
          data: { quantity: warehouseSummary[0].quantity - 1 },
        });
        console.log('updateOldWarehouseSummary', updateOldWarehouseSummary);
        // update Old WarehouseSummary

        const getOutWarehouseSummary = await prisma.warehouseSummaries({
          where: { productId: item.productId, warehouse: { type: 'OUT' } },
        });
        console.log('getOutWarehouseSummary', getOutWarehouseSummary);
        if (getOutWarehouseSummary.length === 0) {
          await prisma.createWarehouseSummary({
            warehouse: { connect: { name: 'OUT' } },
            quantity: 1,
            productId: item.productId,
          });
        } else {
          await prisma.updateWarehouseSummary({
            where: { id: getOutWarehouseSummary[0].id },
            data: { quantity: getOutWarehouseSummary[0].quantity + 1 },
          });
        }
        // update OUT warehouse quantity; If not existing, It will create a new one.

        console.log('updateSummary: ', updateSummary);

        return prisma.updateInventoryItem({
          where: {
            id: item.itemId,
          },
          data: {
            warehouse: {
              connect: { name: 'OUT' },
            },
          },
        });
      }, {})
    );

    return inventoryItems;
  },
  async updateDeliveryItem(data) {
    try {
      console.log('data: ', data.data);
      const getNewItem = await data.data.items.reduce((pre, item, index) => {
        const found = data.prevData.items.find(element => element.id == item.id);
        if (!found) {
          pre.push(item);
          return pre;
        }
        return pre;
      }, []);
      console.log('getNewItem ', getNewItem);
      console.log('Start to update');
      const inventoryItems = await getNewItem.reduce(async (pre, newItem) => {
        console.log('newItem: ', newItem);
        await pre;
        const summary = await prisma.productSummary({ productId: newItem.productId });
        console.log('product summary: ', summary);
        const updateSummary = await prisma.updateProductSummary({
          where: { id: summary.id },
          data: {
            outgoingQuantity: summary.outgoingQuantity - 1,
          },
        });
        console.log('updateSummary: ', updateSummary);

        return prisma.updateInventoryItem({
          where: {
            id: newItem.itemId,
          },
          data: {
            warehouse: {
              connect: { name: 'OUT' },
            },
          },
        });
      }, {});
      return inventoryItems;
    } catch (error) {
      console.log('error: ', error);
    }
  },
  async unpackItem(data) {
    const unpackItems = await Promise.all(
      data.data.items.delete.map(item => {
        return prisma.updateInventoryItem({
          where: {
            id: item.poItemId,
          },
          data: {
            boxId: '',
          },
        });
      })
    );
    const inItems = await Promise.all(
      data.data.items.delete.map(item => {
        return prisma.updateInventoryWarehouse({
          where: {
            name: 'NORMAL',
          },
          data: {
            products: {
              connect: {
                id: item.poItemId,
              },
            },
          },
        });
      })
    );
    return inItems;
  },
  async whenDeleteDeliveryNote(data) {
    const getProductSummary = await prisma.productSummary({ productId: data.productId });
    const updateProductSummary = await prisma.updateProductSummary({
      where: { id: getProductSummary.id },
      data: { outgoingQuantity: getProductSummary.outgoingQuantity + 1, quantity: getProductSummary.quantity - 1 },
    });
    return updateProductSummary;
  },
};

module.exports = {
  deliveryNote,
};
