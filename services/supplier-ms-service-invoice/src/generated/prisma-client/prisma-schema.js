module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateInvoice {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Invoice {
  id: ID!
  code: String!
  salesOrderId: ID!
  userId: ID
  state: InvoiceStatus!
  paymentStatus: InvoicePaymentStatus!
  totalPrice: Float!
  title: String
  remark: String
  shipmentDate: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  paidAt: DateTime
}

type InvoiceConnection {
  pageInfo: PageInfo!
  edges: [InvoiceEdge]!
  aggregate: AggregateInvoice!
}

input InvoiceCreateInput {
  id: ID
  code: String!
  salesOrderId: ID!
  userId: ID
  state: InvoiceStatus!
  paymentStatus: InvoicePaymentStatus!
  totalPrice: Float!
  title: String
  remark: String
  shipmentDate: DateTime!
  paidAt: DateTime
}

type InvoiceEdge {
  node: Invoice!
  cursor: String!
}

enum InvoiceOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  salesOrderId_ASC
  salesOrderId_DESC
  userId_ASC
  userId_DESC
  state_ASC
  state_DESC
  paymentStatus_ASC
  paymentStatus_DESC
  totalPrice_ASC
  totalPrice_DESC
  title_ASC
  title_DESC
  remark_ASC
  remark_DESC
  shipmentDate_ASC
  shipmentDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  paidAt_ASC
  paidAt_DESC
}

enum InvoicePaymentStatus {
  UNPAID
  PENDING
  PARTIAL_PAID
  PAID
  OUTSTANDING
  OVERDUE
}

type InvoicePreviousValues {
  id: ID!
  code: String!
  salesOrderId: ID!
  userId: ID
  state: InvoiceStatus!
  paymentStatus: InvoicePaymentStatus!
  totalPrice: Float!
  title: String
  remark: String
  shipmentDate: DateTime!
  createdAt: DateTime!
  updatedAt: DateTime!
  paidAt: DateTime
}

enum InvoiceStatus {
  DRAFT
  APPROVED
  CONFIRMED
  DELIVERED
  PAID
  DELETED
}

type InvoiceSubscriptionPayload {
  mutation: MutationType!
  node: Invoice
  updatedFields: [String!]
  previousValues: InvoicePreviousValues
}

input InvoiceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InvoiceWhereInput
  AND: [InvoiceSubscriptionWhereInput!]
  OR: [InvoiceSubscriptionWhereInput!]
  NOT: [InvoiceSubscriptionWhereInput!]
}

input InvoiceUpdateInput {
  code: String
  salesOrderId: ID
  userId: ID
  state: InvoiceStatus
  paymentStatus: InvoicePaymentStatus
  totalPrice: Float
  title: String
  remark: String
  shipmentDate: DateTime
  paidAt: DateTime
}

input InvoiceUpdateManyMutationInput {
  code: String
  salesOrderId: ID
  userId: ID
  state: InvoiceStatus
  paymentStatus: InvoicePaymentStatus
  totalPrice: Float
  title: String
  remark: String
  shipmentDate: DateTime
  paidAt: DateTime
}

input InvoiceWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  salesOrderId: ID
  salesOrderId_not: ID
  salesOrderId_in: [ID!]
  salesOrderId_not_in: [ID!]
  salesOrderId_lt: ID
  salesOrderId_lte: ID
  salesOrderId_gt: ID
  salesOrderId_gte: ID
  salesOrderId_contains: ID
  salesOrderId_not_contains: ID
  salesOrderId_starts_with: ID
  salesOrderId_not_starts_with: ID
  salesOrderId_ends_with: ID
  salesOrderId_not_ends_with: ID
  userId: ID
  userId_not: ID
  userId_in: [ID!]
  userId_not_in: [ID!]
  userId_lt: ID
  userId_lte: ID
  userId_gt: ID
  userId_gte: ID
  userId_contains: ID
  userId_not_contains: ID
  userId_starts_with: ID
  userId_not_starts_with: ID
  userId_ends_with: ID
  userId_not_ends_with: ID
  state: InvoiceStatus
  state_not: InvoiceStatus
  state_in: [InvoiceStatus!]
  state_not_in: [InvoiceStatus!]
  paymentStatus: InvoicePaymentStatus
  paymentStatus_not: InvoicePaymentStatus
  paymentStatus_in: [InvoicePaymentStatus!]
  paymentStatus_not_in: [InvoicePaymentStatus!]
  totalPrice: Float
  totalPrice_not: Float
  totalPrice_in: [Float!]
  totalPrice_not_in: [Float!]
  totalPrice_lt: Float
  totalPrice_lte: Float
  totalPrice_gt: Float
  totalPrice_gte: Float
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  remark: String
  remark_not: String
  remark_in: [String!]
  remark_not_in: [String!]
  remark_lt: String
  remark_lte: String
  remark_gt: String
  remark_gte: String
  remark_contains: String
  remark_not_contains: String
  remark_starts_with: String
  remark_not_starts_with: String
  remark_ends_with: String
  remark_not_ends_with: String
  shipmentDate: DateTime
  shipmentDate_not: DateTime
  shipmentDate_in: [DateTime!]
  shipmentDate_not_in: [DateTime!]
  shipmentDate_lt: DateTime
  shipmentDate_lte: DateTime
  shipmentDate_gt: DateTime
  shipmentDate_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  paidAt: DateTime
  paidAt_not: DateTime
  paidAt_in: [DateTime!]
  paidAt_not_in: [DateTime!]
  paidAt_lt: DateTime
  paidAt_lte: DateTime
  paidAt_gt: DateTime
  paidAt_gte: DateTime
  AND: [InvoiceWhereInput!]
  OR: [InvoiceWhereInput!]
  NOT: [InvoiceWhereInput!]
}

input InvoiceWhereUniqueInput {
  id: ID
  code: String
}

scalar Long

type Mutation {
  createInvoice(data: InvoiceCreateInput!): Invoice!
  updateInvoice(data: InvoiceUpdateInput!, where: InvoiceWhereUniqueInput!): Invoice
  updateManyInvoices(data: InvoiceUpdateManyMutationInput!, where: InvoiceWhereInput): BatchPayload!
  upsertInvoice(where: InvoiceWhereUniqueInput!, create: InvoiceCreateInput!, update: InvoiceUpdateInput!): Invoice!
  deleteInvoice(where: InvoiceWhereUniqueInput!): Invoice
  deleteManyInvoices(where: InvoiceWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  invoice(where: InvoiceWhereUniqueInput!): Invoice
  invoices(where: InvoiceWhereInput, orderBy: InvoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Invoice]!
  invoicesConnection(where: InvoiceWhereInput, orderBy: InvoiceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InvoiceConnection!
  node(id: ID!): Node
}

type Subscription {
  invoice(where: InvoiceSubscriptionWhereInput): InvoiceSubscriptionPayload
}
`
      }
    