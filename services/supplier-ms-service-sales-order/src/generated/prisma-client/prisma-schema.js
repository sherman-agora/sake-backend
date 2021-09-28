module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateSalesOrder {
  count: Int!
}

type AggregateSalesOrderItem {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createSalesOrder(data: SalesOrderCreateInput!): SalesOrder!
  updateSalesOrder(data: SalesOrderUpdateInput!, where: SalesOrderWhereUniqueInput!): SalesOrder
  updateManySalesOrders(data: SalesOrderUpdateManyMutationInput!, where: SalesOrderWhereInput): BatchPayload!
  upsertSalesOrder(where: SalesOrderWhereUniqueInput!, create: SalesOrderCreateInput!, update: SalesOrderUpdateInput!): SalesOrder!
  deleteSalesOrder(where: SalesOrderWhereUniqueInput!): SalesOrder
  deleteManySalesOrders(where: SalesOrderWhereInput): BatchPayload!
  createSalesOrderItem(data: SalesOrderItemCreateInput!): SalesOrderItem!
  updateSalesOrderItem(data: SalesOrderItemUpdateInput!, where: SalesOrderItemWhereUniqueInput!): SalesOrderItem
  updateManySalesOrderItems(data: SalesOrderItemUpdateManyMutationInput!, where: SalesOrderItemWhereInput): BatchPayload!
  upsertSalesOrderItem(where: SalesOrderItemWhereUniqueInput!, create: SalesOrderItemCreateInput!, update: SalesOrderItemUpdateInput!): SalesOrderItem!
  deleteSalesOrderItem(where: SalesOrderItemWhereUniqueInput!): SalesOrderItem
  deleteManySalesOrderItems(where: SalesOrderItemWhereInput): BatchPayload!
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
  salesOrder(where: SalesOrderWhereUniqueInput!): SalesOrder
  salesOrders(where: SalesOrderWhereInput, orderBy: SalesOrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SalesOrder]!
  salesOrdersConnection(where: SalesOrderWhereInput, orderBy: SalesOrderOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SalesOrderConnection!
  salesOrderItem(where: SalesOrderItemWhereUniqueInput!): SalesOrderItem
  salesOrderItems(where: SalesOrderItemWhereInput, orderBy: SalesOrderItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SalesOrderItem]!
  salesOrderItemsConnection(where: SalesOrderItemWhereInput, orderBy: SalesOrderItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SalesOrderItemConnection!
  node(id: ID!): Node
}

type SalesOrder {
  id: ID!
  code: String!
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float!
  state: SalesOrderStatus!
  userId: ID
  shopId: ID!
  products(where: SalesOrderItemWhereInput, orderBy: SalesOrderItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SalesOrderItem!]
  shippingDate: String
  actualDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SalesOrderConnection {
  pageInfo: PageInfo!
  edges: [SalesOrderEdge]!
  aggregate: AggregateSalesOrder!
}

input SalesOrderCreateInput {
  id: ID
  code: String!
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float!
  state: SalesOrderStatus!
  userId: ID
  shopId: ID!
  products: SalesOrderItemCreateManyWithoutSalesOrderInput
  shippingDate: String
  actualDate: DateTime
}

input SalesOrderCreateOneWithoutProductsInput {
  create: SalesOrderCreateWithoutProductsInput
  connect: SalesOrderWhereUniqueInput
}

input SalesOrderCreateWithoutProductsInput {
  id: ID
  code: String!
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float!
  state: SalesOrderStatus!
  userId: ID
  shopId: ID!
  shippingDate: String
  actualDate: DateTime
}

type SalesOrderEdge {
  node: SalesOrder!
  cursor: String!
}

type SalesOrderItem {
  id: ID!
  salesOrder: SalesOrder!
  productId: ID!
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int!
  salesPlan: Int
  subPrice: Float
  price: Float!
  totalPrice: Float!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SalesOrderItemConnection {
  pageInfo: PageInfo!
  edges: [SalesOrderItemEdge]!
  aggregate: AggregateSalesOrderItem!
}

input SalesOrderItemCreateInput {
  id: ID
  salesOrder: SalesOrderCreateOneWithoutProductsInput!
  productId: ID!
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int!
  salesPlan: Int
  subPrice: Float
  price: Float!
  totalPrice: Float!
}

input SalesOrderItemCreateManyWithoutSalesOrderInput {
  create: [SalesOrderItemCreateWithoutSalesOrderInput!]
  connect: [SalesOrderItemWhereUniqueInput!]
}

input SalesOrderItemCreateWithoutSalesOrderInput {
  id: ID
  productId: ID!
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int!
  salesPlan: Int
  subPrice: Float
  price: Float!
  totalPrice: Float!
}

type SalesOrderItemEdge {
  node: SalesOrderItem!
  cursor: String!
}

enum SalesOrderItemOrderByInput {
  id_ASC
  id_DESC
  productId_ASC
  productId_DESC
  discount_ASC
  discount_DESC
  discountAmount_ASC
  discountAmount_DESC
  wholeSalePrice_ASC
  wholeSalePrice_DESC
  remarks_ASC
  remarks_DESC
  quantity_ASC
  quantity_DESC
  salesPlan_ASC
  salesPlan_DESC
  subPrice_ASC
  subPrice_DESC
  price_ASC
  price_DESC
  totalPrice_ASC
  totalPrice_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SalesOrderItemPreviousValues {
  id: ID!
  productId: ID!
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int!
  salesPlan: Int
  subPrice: Float
  price: Float!
  totalPrice: Float!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input SalesOrderItemScalarWhereInput {
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
  productId: ID
  productId_not: ID
  productId_in: [ID!]
  productId_not_in: [ID!]
  productId_lt: ID
  productId_lte: ID
  productId_gt: ID
  productId_gte: ID
  productId_contains: ID
  productId_not_contains: ID
  productId_starts_with: ID
  productId_not_starts_with: ID
  productId_ends_with: ID
  productId_not_ends_with: ID
  discount: String
  discount_not: String
  discount_in: [String!]
  discount_not_in: [String!]
  discount_lt: String
  discount_lte: String
  discount_gt: String
  discount_gte: String
  discount_contains: String
  discount_not_contains: String
  discount_starts_with: String
  discount_not_starts_with: String
  discount_ends_with: String
  discount_not_ends_with: String
  discountAmount: Float
  discountAmount_not: Float
  discountAmount_in: [Float!]
  discountAmount_not_in: [Float!]
  discountAmount_lt: Float
  discountAmount_lte: Float
  discountAmount_gt: Float
  discountAmount_gte: Float
  wholeSalePrice: Float
  wholeSalePrice_not: Float
  wholeSalePrice_in: [Float!]
  wholeSalePrice_not_in: [Float!]
  wholeSalePrice_lt: Float
  wholeSalePrice_lte: Float
  wholeSalePrice_gt: Float
  wholeSalePrice_gte: Float
  remarks: String
  remarks_not: String
  remarks_in: [String!]
  remarks_not_in: [String!]
  remarks_lt: String
  remarks_lte: String
  remarks_gt: String
  remarks_gte: String
  remarks_contains: String
  remarks_not_contains: String
  remarks_starts_with: String
  remarks_not_starts_with: String
  remarks_ends_with: String
  remarks_not_ends_with: String
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  salesPlan: Int
  salesPlan_not: Int
  salesPlan_in: [Int!]
  salesPlan_not_in: [Int!]
  salesPlan_lt: Int
  salesPlan_lte: Int
  salesPlan_gt: Int
  salesPlan_gte: Int
  subPrice: Float
  subPrice_not: Float
  subPrice_in: [Float!]
  subPrice_not_in: [Float!]
  subPrice_lt: Float
  subPrice_lte: Float
  subPrice_gt: Float
  subPrice_gte: Float
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  totalPrice: Float
  totalPrice_not: Float
  totalPrice_in: [Float!]
  totalPrice_not_in: [Float!]
  totalPrice_lt: Float
  totalPrice_lte: Float
  totalPrice_gt: Float
  totalPrice_gte: Float
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
  AND: [SalesOrderItemScalarWhereInput!]
  OR: [SalesOrderItemScalarWhereInput!]
  NOT: [SalesOrderItemScalarWhereInput!]
}

type SalesOrderItemSubscriptionPayload {
  mutation: MutationType!
  node: SalesOrderItem
  updatedFields: [String!]
  previousValues: SalesOrderItemPreviousValues
}

input SalesOrderItemSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SalesOrderItemWhereInput
  AND: [SalesOrderItemSubscriptionWhereInput!]
  OR: [SalesOrderItemSubscriptionWhereInput!]
  NOT: [SalesOrderItemSubscriptionWhereInput!]
}

input SalesOrderItemUpdateInput {
  salesOrder: SalesOrderUpdateOneRequiredWithoutProductsInput
  productId: ID
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int
  salesPlan: Int
  subPrice: Float
  price: Float
  totalPrice: Float
}

input SalesOrderItemUpdateManyDataInput {
  productId: ID
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int
  salesPlan: Int
  subPrice: Float
  price: Float
  totalPrice: Float
}

input SalesOrderItemUpdateManyMutationInput {
  productId: ID
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int
  salesPlan: Int
  subPrice: Float
  price: Float
  totalPrice: Float
}

input SalesOrderItemUpdateManyWithoutSalesOrderInput {
  create: [SalesOrderItemCreateWithoutSalesOrderInput!]
  delete: [SalesOrderItemWhereUniqueInput!]
  connect: [SalesOrderItemWhereUniqueInput!]
  set: [SalesOrderItemWhereUniqueInput!]
  disconnect: [SalesOrderItemWhereUniqueInput!]
  update: [SalesOrderItemUpdateWithWhereUniqueWithoutSalesOrderInput!]
  upsert: [SalesOrderItemUpsertWithWhereUniqueWithoutSalesOrderInput!]
  deleteMany: [SalesOrderItemScalarWhereInput!]
  updateMany: [SalesOrderItemUpdateManyWithWhereNestedInput!]
}

input SalesOrderItemUpdateManyWithWhereNestedInput {
  where: SalesOrderItemScalarWhereInput!
  data: SalesOrderItemUpdateManyDataInput!
}

input SalesOrderItemUpdateWithoutSalesOrderDataInput {
  productId: ID
  discount: String
  discountAmount: Float
  wholeSalePrice: Float
  remarks: String
  quantity: Int
  salesPlan: Int
  subPrice: Float
  price: Float
  totalPrice: Float
}

input SalesOrderItemUpdateWithWhereUniqueWithoutSalesOrderInput {
  where: SalesOrderItemWhereUniqueInput!
  data: SalesOrderItemUpdateWithoutSalesOrderDataInput!
}

input SalesOrderItemUpsertWithWhereUniqueWithoutSalesOrderInput {
  where: SalesOrderItemWhereUniqueInput!
  update: SalesOrderItemUpdateWithoutSalesOrderDataInput!
  create: SalesOrderItemCreateWithoutSalesOrderInput!
}

input SalesOrderItemWhereInput {
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
  salesOrder: SalesOrderWhereInput
  productId: ID
  productId_not: ID
  productId_in: [ID!]
  productId_not_in: [ID!]
  productId_lt: ID
  productId_lte: ID
  productId_gt: ID
  productId_gte: ID
  productId_contains: ID
  productId_not_contains: ID
  productId_starts_with: ID
  productId_not_starts_with: ID
  productId_ends_with: ID
  productId_not_ends_with: ID
  discount: String
  discount_not: String
  discount_in: [String!]
  discount_not_in: [String!]
  discount_lt: String
  discount_lte: String
  discount_gt: String
  discount_gte: String
  discount_contains: String
  discount_not_contains: String
  discount_starts_with: String
  discount_not_starts_with: String
  discount_ends_with: String
  discount_not_ends_with: String
  discountAmount: Float
  discountAmount_not: Float
  discountAmount_in: [Float!]
  discountAmount_not_in: [Float!]
  discountAmount_lt: Float
  discountAmount_lte: Float
  discountAmount_gt: Float
  discountAmount_gte: Float
  wholeSalePrice: Float
  wholeSalePrice_not: Float
  wholeSalePrice_in: [Float!]
  wholeSalePrice_not_in: [Float!]
  wholeSalePrice_lt: Float
  wholeSalePrice_lte: Float
  wholeSalePrice_gt: Float
  wholeSalePrice_gte: Float
  remarks: String
  remarks_not: String
  remarks_in: [String!]
  remarks_not_in: [String!]
  remarks_lt: String
  remarks_lte: String
  remarks_gt: String
  remarks_gte: String
  remarks_contains: String
  remarks_not_contains: String
  remarks_starts_with: String
  remarks_not_starts_with: String
  remarks_ends_with: String
  remarks_not_ends_with: String
  quantity: Int
  quantity_not: Int
  quantity_in: [Int!]
  quantity_not_in: [Int!]
  quantity_lt: Int
  quantity_lte: Int
  quantity_gt: Int
  quantity_gte: Int
  salesPlan: Int
  salesPlan_not: Int
  salesPlan_in: [Int!]
  salesPlan_not_in: [Int!]
  salesPlan_lt: Int
  salesPlan_lte: Int
  salesPlan_gt: Int
  salesPlan_gte: Int
  subPrice: Float
  subPrice_not: Float
  subPrice_in: [Float!]
  subPrice_not_in: [Float!]
  subPrice_lt: Float
  subPrice_lte: Float
  subPrice_gt: Float
  subPrice_gte: Float
  price: Float
  price_not: Float
  price_in: [Float!]
  price_not_in: [Float!]
  price_lt: Float
  price_lte: Float
  price_gt: Float
  price_gte: Float
  totalPrice: Float
  totalPrice_not: Float
  totalPrice_in: [Float!]
  totalPrice_not_in: [Float!]
  totalPrice_lt: Float
  totalPrice_lte: Float
  totalPrice_gt: Float
  totalPrice_gte: Float
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
  AND: [SalesOrderItemWhereInput!]
  OR: [SalesOrderItemWhereInput!]
  NOT: [SalesOrderItemWhereInput!]
}

input SalesOrderItemWhereUniqueInput {
  id: ID
}

enum SalesOrderOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  title_ASC
  title_DESC
  remark_ASC
  remark_DESC
  discountAmount_ASC
  discountAmount_DESC
  couponDiscount_ASC
  couponDiscount_DESC
  discount_ASC
  discount_DESC
  subtotal_ASC
  subtotal_DESC
  grandTotal_ASC
  grandTotal_DESC
  state_ASC
  state_DESC
  userId_ASC
  userId_DESC
  shopId_ASC
  shopId_DESC
  shippingDate_ASC
  shippingDate_DESC
  actualDate_ASC
  actualDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SalesOrderPreviousValues {
  id: ID!
  code: String!
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float!
  state: SalesOrderStatus!
  userId: ID
  shopId: ID!
  shippingDate: String
  actualDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum SalesOrderStatus {
  RECEIVED
  CONFIRMED
  INVOICED
  PACKED
  SHIPPED
  DELIVERED
  PAID
  DELETED
}

type SalesOrderSubscriptionPayload {
  mutation: MutationType!
  node: SalesOrder
  updatedFields: [String!]
  previousValues: SalesOrderPreviousValues
}

input SalesOrderSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SalesOrderWhereInput
  AND: [SalesOrderSubscriptionWhereInput!]
  OR: [SalesOrderSubscriptionWhereInput!]
  NOT: [SalesOrderSubscriptionWhereInput!]
}

input SalesOrderUpdateInput {
  code: String
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float
  state: SalesOrderStatus
  userId: ID
  shopId: ID
  products: SalesOrderItemUpdateManyWithoutSalesOrderInput
  shippingDate: String
  actualDate: DateTime
}

input SalesOrderUpdateManyMutationInput {
  code: String
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float
  state: SalesOrderStatus
  userId: ID
  shopId: ID
  shippingDate: String
  actualDate: DateTime
}

input SalesOrderUpdateOneRequiredWithoutProductsInput {
  create: SalesOrderCreateWithoutProductsInput
  update: SalesOrderUpdateWithoutProductsDataInput
  upsert: SalesOrderUpsertWithoutProductsInput
  connect: SalesOrderWhereUniqueInput
}

input SalesOrderUpdateWithoutProductsDataInput {
  code: String
  title: String
  remark: String
  discountAmount: Float
  couponDiscount: Float
  discount: Float
  subtotal: Float
  grandTotal: Float
  state: SalesOrderStatus
  userId: ID
  shopId: ID
  shippingDate: String
  actualDate: DateTime
}

input SalesOrderUpsertWithoutProductsInput {
  update: SalesOrderUpdateWithoutProductsDataInput!
  create: SalesOrderCreateWithoutProductsInput!
}

input SalesOrderWhereInput {
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
  discountAmount: Float
  discountAmount_not: Float
  discountAmount_in: [Float!]
  discountAmount_not_in: [Float!]
  discountAmount_lt: Float
  discountAmount_lte: Float
  discountAmount_gt: Float
  discountAmount_gte: Float
  couponDiscount: Float
  couponDiscount_not: Float
  couponDiscount_in: [Float!]
  couponDiscount_not_in: [Float!]
  couponDiscount_lt: Float
  couponDiscount_lte: Float
  couponDiscount_gt: Float
  couponDiscount_gte: Float
  discount: Float
  discount_not: Float
  discount_in: [Float!]
  discount_not_in: [Float!]
  discount_lt: Float
  discount_lte: Float
  discount_gt: Float
  discount_gte: Float
  subtotal: Float
  subtotal_not: Float
  subtotal_in: [Float!]
  subtotal_not_in: [Float!]
  subtotal_lt: Float
  subtotal_lte: Float
  subtotal_gt: Float
  subtotal_gte: Float
  grandTotal: Float
  grandTotal_not: Float
  grandTotal_in: [Float!]
  grandTotal_not_in: [Float!]
  grandTotal_lt: Float
  grandTotal_lte: Float
  grandTotal_gt: Float
  grandTotal_gte: Float
  state: SalesOrderStatus
  state_not: SalesOrderStatus
  state_in: [SalesOrderStatus!]
  state_not_in: [SalesOrderStatus!]
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
  shopId: ID
  shopId_not: ID
  shopId_in: [ID!]
  shopId_not_in: [ID!]
  shopId_lt: ID
  shopId_lte: ID
  shopId_gt: ID
  shopId_gte: ID
  shopId_contains: ID
  shopId_not_contains: ID
  shopId_starts_with: ID
  shopId_not_starts_with: ID
  shopId_ends_with: ID
  shopId_not_ends_with: ID
  products_every: SalesOrderItemWhereInput
  products_some: SalesOrderItemWhereInput
  products_none: SalesOrderItemWhereInput
  shippingDate: String
  shippingDate_not: String
  shippingDate_in: [String!]
  shippingDate_not_in: [String!]
  shippingDate_lt: String
  shippingDate_lte: String
  shippingDate_gt: String
  shippingDate_gte: String
  shippingDate_contains: String
  shippingDate_not_contains: String
  shippingDate_starts_with: String
  shippingDate_not_starts_with: String
  shippingDate_ends_with: String
  shippingDate_not_ends_with: String
  actualDate: DateTime
  actualDate_not: DateTime
  actualDate_in: [DateTime!]
  actualDate_not_in: [DateTime!]
  actualDate_lt: DateTime
  actualDate_lte: DateTime
  actualDate_gt: DateTime
  actualDate_gte: DateTime
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
  AND: [SalesOrderWhereInput!]
  OR: [SalesOrderWhereInput!]
  NOT: [SalesOrderWhereInput!]
}

input SalesOrderWhereUniqueInput {
  id: ID
  code: String
}

type Subscription {
  salesOrder(where: SalesOrderSubscriptionWhereInput): SalesOrderSubscriptionPayload
  salesOrderItem(where: SalesOrderItemSubscriptionWhereInput): SalesOrderItemSubscriptionPayload
}
`
      }
    