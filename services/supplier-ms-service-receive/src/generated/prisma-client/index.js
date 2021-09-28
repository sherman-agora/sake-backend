"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "ReceivePayment",
    embedded: false
  },
  {
    name: "PaymentType",
    embedded: false
  },
  {
    name: "ReceivePaymentState",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://${process.env["PRISMA_HOST"]}:${
    process.env["PRISMA_PORT"]
  }/supplierms-receive/${process.env["PRISMA_STAGE"]}`
});
exports.prisma = new exports.Prisma();
