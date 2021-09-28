const DataLoader = require('dataloader');
const { prisma } = require('../../generated/prisma-client');

const inventoryItemLoader = new DataLoader(async ids => {
  const items = await prisma.inventoryItems({ where: { id_in: ids } });
  const map = items.reduce((results, item) => {
    results[item.id] = item;
    return results;
  }, {});
  const data = ids.map(id => map[id]);

  return data;
});
const warehouseLoader = new DataLoader(async ids => {
  const warehouses = await prisma.warehouses();
  const allItems = await Promise.all(
    warehouses.map(async wh => {
      let items = await prisma.warehouse({ id: wh.id }).products();
      items = items.map(i => {
        i.warehouse = wh;
        return i;
      });
      return items;
    })
  );
  // console.log('allItems:', JSON.stringify(allItems));
  const dict = allItems.flat().reduce((results, item) => {
    results[item.id] = item.warehouse;
    return results;
  }, {});

  console.log();

  const results = ids.map((id, i) => {
    if (id === '5f33905824aa9a00086f1370') {
      console.log(`${JSON.stringify(dict[id])} + ${i}`);
    }
    return dict[id];
  });

  console.log(results[1001]);
  // const results = ids.reduce(async (re, id) => {
  //   if (!re) {
  //     re = [];
  //   }
  //   await re;
  //   re.push(dict[id]);
  //   if (id === '5f33905824aa9a00086f1370') {
  //     console.log('Passed: ', dict[id]);
  //   }
  //   return re;
  // }, []);

  return results;
});

const InventoryItem = {
  async __resolveReference({ id }) {
    const items = await inventoryItemLoader.load(id);
    return items;
  },

  async product({ id }) {
    const data = await prisma.inventoryItem({ id });
    return { __typename: 'Product', id: data.productId };
  },

  async purchaseOrder({ id }) {
    const data = await prisma.inventoryItem({ id });
    return { __typename: 'PurchaseOrder', id: data.purchaseOrderId };
  },

  async deliveryNote({ id }) {
    const data = await prisma.inventoryItem({ id });
    return data.deliveryNoteId ? { __typename: 'DeliveryNote', id: data.deliveryNoteId } : null;
  },

  async warehouse({ id }) {
    const warehouse = await warehouseLoader.load(id);
    warehouseLoader.clear(id);
    return warehouse;
  },
};

module.exports = {
  InventoryItem,
};
