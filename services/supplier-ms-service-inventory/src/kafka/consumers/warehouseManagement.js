const { prisma } = require('../../generated/prisma-client');

const warehouseManagement = {
    async inWarehouse(data) {
        console.log(data);
        const inventorySummary = await Promise.all(
            data.inWarehouseProduct.map(async (product) => {
                const inventorySummary = await prisma.inventorySummaries(
                    {
                        where: {
                            product: { code: product.code },
                            warehouse: { name: data.whName },
                        }
                    });
                console.log(inventorySummary)
                var newQunatity = inventorySummary[0].quantity + product.quantity;

                const updatedInventorySummary = await prisma.updateInventorySummary({
                    where: {
                        id: inventorySummary[0].id,
                    },
                    data: {
                        quantity: newQunatity,
                    },
                });
                const inventoryProduct = await prisma.inventoryProduct({
                    code: product.code,
                },
                );
                var newProductQuantity = inventoryProduct.quantity + product.quantity;
                const updatedPorductQuantity = await prisma.updateInventoryProduct({
                    where: {
                        code: product.code,
                    },
                    data: {
                        quantity: newProductQuantity,
                    }
                })
            })
        );
        return inventorySummary;
    },

    async outWarehouse(data) {
        console.log(data);

        return inventorySummary;
    },
    async transferWarehouse(data) {
        console.log(data);
        const inventorySummary = await Promise.all(
            data.inventoryItems.map(async (item) => {
                const inventoryFromSummary = await prisma.inventorySummaries(
                    {
                        where: {
                            product: { code: item.code },
                            warehouse: { name: data.fromWhName },
                        }
                    });
                const inventoryToSummary = await prisma.inventorySummaries(
                    {
                        where: {
                            product: { code: item.code },
                            warehouse: { name: data.toWhName },
                        }
                    });
                var newFromQunatity = inventoryFromSummary[0].quantity - 1;
                var newToQunatity = inventoryToSummary[0].quantity + 1;
                const updatedInventoryFromSummary = await prisma.updateInventorySummary({
                    where: {
                        id: inventoryFromSummary[0].id,
                    },
                    data: {
                        quantity: newFromQunatity,
                    },
                });
                const updatedInventoryToSummary = await prisma.updateInventorySummary({
                    where: {
                        id: inventoryToSummary[0].id,
                    },
                    data: {
                        quantity: newToQunatity,
                    },
                });
                const inventoryProduct = await prisma.inventoryProduct({
                    code: item.code,
                },
                );
                if (data.toWhName === 'OUT' || data.toWhName === 'DISPOSE') {
                    var newProductQuantity = inventoryProduct.quantity - 1;
                    const updatedPorductQuantity = await prisma.updateInventoryProduct({
                        where: {
                            code: item.code,
                        },
                        data: {
                            quantity: newProductQuantity,
                        }
                    })
                }
            })
        );
        return inventorySummary;
    },
};
module.exports = {
    warehouseManagement,
};
