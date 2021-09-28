"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Auth",
    embedded: false
  },
  {
    name: "Redirect",
    embedded: false
  },
  {
    name: "XeroUser",
    embedded: false
  },
  {
    name: "Contact",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://${process.env["PRISMA_HOST"]}:${
    process.env["PRISMA_PORT"]
  }/supplierms-xero/${process.env["PRISMA_STAGE"]}`
});
exports.prisma = new exports.Prisma();
