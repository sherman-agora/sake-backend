"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "DeliveryNote",
    embedded: false
  },
  {
    name: "DeliveryStatus",
    embedded: false
  },
  {
    name: "DeliveryItem",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://${process.env["PRISMA_HOST"]}:${
    process.env["PRISMA_PORT"]
  }/supplierms-delivery/${process.env["PRISMA_STAGE"]}`
});
exports.prisma = new exports.Prisma();
