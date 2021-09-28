const { prisma } = require('../../generated/prisma-client');

const product = {
  async createProduct(data) {
    const inventoryProduct = await prisma.createInventoryProduct({
      id: data.id,
      code: data.code,
      nameEn: data.nameEn,
      nameChi: data.nameChi,
      brandEn: data.brandEn,
      brandChi: data.brandChi,
      sku: data.sku,
      country: data.country,
      cost: data.cost,
      wholeSalePrice1: data.wholeSalePrice1,
      wholeSalePrice2: data.wholeSalePrice2,
      wholeSalePrice3: data.wholeSalePrice3,
      wholeSalePrice4: data.wholeSalePrice4,
      wholeSalePrice5: data.wholeSalePrice5,
      minOrderQuantity: data.minOrderQuantity,
      minStockLevel: data.minStockLevel,
      quantity: 0,
      categories: data.categories,
    });
    const warehouseName = await prisma.inventoryWarehouses();
    const inventorySummary = await Promise.all(
      warehouseName.map(warehouse =>
        prisma.createInventorySummary({
        warehouse: { connect: { name: warehouse.name } },
        product: { connect: { code: data.code } },
        quantity: 0,
      })
      )
    );
    console.log(inventorySummary)
    return inventoryProduct;
  },

  async updateProduct(args) {
    const result = await prisma.updateInventoryProduct({
      where: args.where,
      data: args.data,
    });
    return result;
  },
  async createProductCategory(data) {
    const results = await prisma.createInventoryProductCategory({
      nameEn: data.nameEn,
      nameChi: data.nameChi,
    });
    return results;
  },
  async updateProductCategory(args) {
    const results = await prisma.updateInventoryProductCategory({
      where: args.where,
      data: args.data,
    });
    return results;
  },
};
module.exports = {
  product,
};
