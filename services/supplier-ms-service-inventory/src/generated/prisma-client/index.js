"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Warehouse",
    embedded: false
  },
  {
    name: "WarehouseType",
    embedded: false
  },
  {
    name: "InventoryItem",
    embedded: false
  },
  {
    name: "ProductSummary",
    embedded: false
  },
  {
    name: "WarehouseSummary",
    embedded: false
  },
  {
    name: "ExpiryDateSummary",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://${process.env["PRISMA_HOST"]}:${
    process.env["PRISMA_PORT"]
  }/supplierms-inventory/${process.env["PRISMA_STAGE"]}`
});
exports.prisma = new exports.Prisma();
