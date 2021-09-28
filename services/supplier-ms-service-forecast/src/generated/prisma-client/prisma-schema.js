module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateForecastProduct {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type ForecastProduct {
  id: ID!
  productId: ID!
  monthlySalesOnAverage: Float!
  numberOfMonth: Int!
}

type ForecastProductConnection {
  pageInfo: PageInfo!
  edges: [ForecastProductEdge]!
  aggregate: AggregateForecastProduct!
}

input ForecastProductCreateInput {
  id: ID
  productId: ID!
  monthlySalesOnAverage: Float!
  numberOfMonth: Int!
}

type ForecastProductEdge {
  node: ForecastProduct!
  cursor: String!
}

enum ForecastProductOrderByInput {
  id_ASC
  id_DESC
  productId_ASC
  productId_DESC
  monthlySalesOnAverage_ASC
  monthlySalesOnAverage_DESC
  numberOfMonth_ASC
  numberOfMonth_DESC
}

type ForecastProductPreviousValues {
  id: ID!
  productId: ID!
  monthlySalesOnAverage: Float!
  numberOfMonth: Int!
}

type ForecastProductSubscriptionPayload {
  mutation: MutationType!
  node: ForecastProduct
  updatedFields: [String!]
  previousValues: ForecastProductPreviousValues
}

input ForecastProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ForecastProductWhereInput
  AND: [ForecastProductSubscriptionWhereInput!]
  OR: [ForecastProductSubscriptionWhereInput!]
  NOT: [ForecastProductSubscriptionWhereInput!]
}

input ForecastProductUpdateInput {
  productId: ID
  monthlySalesOnAverage: Float
  numberOfMonth: Int
}

input ForecastProductUpdateManyMutationInput {
  productId: ID
  monthlySalesOnAverage: Float
  numberOfMonth: Int
}

input ForecastProductWhereInput {
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
  monthlySalesOnAverage: Float
  monthlySalesOnAverage_not: Float
  monthlySalesOnAverage_in: [Float!]
  monthlySalesOnAverage_not_in: [Float!]
  monthlySalesOnAverage_lt: Float
  monthlySalesOnAverage_lte: Float
  monthlySalesOnAverage_gt: Float
  monthlySalesOnAverage_gte: Float
  numberOfMonth: Int
  numberOfMonth_not: Int
  numberOfMonth_in: [Int!]
  numberOfMonth_not_in: [Int!]
  numberOfMonth_lt: Int
  numberOfMonth_lte: Int
  numberOfMonth_gt: Int
  numberOfMonth_gte: Int
  AND: [ForecastProductWhereInput!]
  OR: [ForecastProductWhereInput!]
  NOT: [ForecastProductWhereInput!]
}

input ForecastProductWhereUniqueInput {
  id: ID
  productId: ID
}

scalar Long

type Mutation {
  createForecastProduct(data: ForecastProductCreateInput!): ForecastProduct!
  updateForecastProduct(data: ForecastProductUpdateInput!, where: ForecastProductWhereUniqueInput!): ForecastProduct
  updateManyForecastProducts(data: ForecastProductUpdateManyMutationInput!, where: ForecastProductWhereInput): BatchPayload!
  upsertForecastProduct(where: ForecastProductWhereUniqueInput!, create: ForecastProductCreateInput!, update: ForecastProductUpdateInput!): ForecastProduct!
  deleteForecastProduct(where: ForecastProductWhereUniqueInput!): ForecastProduct
  deleteManyForecastProducts(where: ForecastProductWhereInput): BatchPayload!
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
  forecastProduct(where: ForecastProductWhereUniqueInput!): ForecastProduct
  forecastProducts(where: ForecastProductWhereInput, orderBy: ForecastProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ForecastProduct]!
  forecastProductsConnection(where: ForecastProductWhereInput, orderBy: ForecastProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ForecastProductConnection!
  node(id: ID!): Node
}

type Subscription {
  forecastProduct(where: ForecastProductSubscriptionWhereInput): ForecastProductSubscriptionPayload
}
`
      }
    