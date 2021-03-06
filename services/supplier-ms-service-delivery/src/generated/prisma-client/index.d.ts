// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  deliveryItem: (where?: DeliveryItemWhereInput) => Promise<boolean>;
  deliveryNote: (where?: DeliveryNoteWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  deliveryItem: (
    where: DeliveryItemWhereUniqueInput
  ) => DeliveryItemNullablePromise;
  deliveryItems: (args?: {
    where?: DeliveryItemWhereInput;
    orderBy?: DeliveryItemOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<DeliveryItem>;
  deliveryItemsConnection: (args?: {
    where?: DeliveryItemWhereInput;
    orderBy?: DeliveryItemOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => DeliveryItemConnectionPromise;
  deliveryNote: (
    where: DeliveryNoteWhereUniqueInput
  ) => DeliveryNoteNullablePromise;
  deliveryNotes: (args?: {
    where?: DeliveryNoteWhereInput;
    orderBy?: DeliveryNoteOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<DeliveryNote>;
  deliveryNotesConnection: (args?: {
    where?: DeliveryNoteWhereInput;
    orderBy?: DeliveryNoteOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => DeliveryNoteConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createDeliveryItem: (data: DeliveryItemCreateInput) => DeliveryItemPromise;
  updateDeliveryItem: (args: {
    data: DeliveryItemUpdateInput;
    where: DeliveryItemWhereUniqueInput;
  }) => DeliveryItemPromise;
  updateManyDeliveryItems: (args: {
    data: DeliveryItemUpdateManyMutationInput;
    where?: DeliveryItemWhereInput;
  }) => BatchPayloadPromise;
  upsertDeliveryItem: (args: {
    where: DeliveryItemWhereUniqueInput;
    create: DeliveryItemCreateInput;
    update: DeliveryItemUpdateInput;
  }) => DeliveryItemPromise;
  deleteDeliveryItem: (
    where: DeliveryItemWhereUniqueInput
  ) => DeliveryItemPromise;
  deleteManyDeliveryItems: (
    where?: DeliveryItemWhereInput
  ) => BatchPayloadPromise;
  createDeliveryNote: (data: DeliveryNoteCreateInput) => DeliveryNotePromise;
  updateDeliveryNote: (args: {
    data: DeliveryNoteUpdateInput;
    where: DeliveryNoteWhereUniqueInput;
  }) => DeliveryNotePromise;
  updateManyDeliveryNotes: (args: {
    data: DeliveryNoteUpdateManyMutationInput;
    where?: DeliveryNoteWhereInput;
  }) => BatchPayloadPromise;
  upsertDeliveryNote: (args: {
    where: DeliveryNoteWhereUniqueInput;
    create: DeliveryNoteCreateInput;
    update: DeliveryNoteUpdateInput;
  }) => DeliveryNotePromise;
  deleteDeliveryNote: (
    where: DeliveryNoteWhereUniqueInput
  ) => DeliveryNotePromise;
  deleteManyDeliveryNotes: (
    where?: DeliveryNoteWhereInput
  ) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  deliveryItem: (
    where?: DeliveryItemSubscriptionWhereInput
  ) => DeliveryItemSubscriptionPayloadSubscription;
  deliveryNote: (
    where?: DeliveryNoteSubscriptionWhereInput
  ) => DeliveryNoteSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type DeliveryStatus =
  | "SENT"
  | "PICKED"
  | "PACKED"
  | "DELIVERED"
  | "DELETED";

export type DeliveryItemOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "productId_ASC"
  | "productId_DESC"
  | "itemId_ASC"
  | "itemId_DESC"
  | "boxNum_ASC"
  | "boxNum_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type DeliveryNoteOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "code_ASC"
  | "code_DESC"
  | "salesOrderId_ASC"
  | "salesOrderId_DESC"
  | "invoiceId_ASC"
  | "invoiceId_DESC"
  | "userId_ASC"
  | "userId_DESC"
  | "customerId_ASC"
  | "customerId_DESC"
  | "state_ASC"
  | "state_DESC"
  | "deliveryDate_ASC"
  | "deliveryDate_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface DeliveryItemUpdateInput {
  deliveryNote?: Maybe<DeliveryNoteUpdateOneRequiredWithoutItemsInput>;
  productId?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
}

export type DeliveryItemWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
}>;

export interface DeliveryItemUpdateManyWithoutDeliveryNoteInput {
  create?: Maybe<
    | DeliveryItemCreateWithoutDeliveryNoteInput[]
    | DeliveryItemCreateWithoutDeliveryNoteInput
  >;
  delete?: Maybe<DeliveryItemWhereUniqueInput[] | DeliveryItemWhereUniqueInput>;
  connect?: Maybe<
    DeliveryItemWhereUniqueInput[] | DeliveryItemWhereUniqueInput
  >;
  set?: Maybe<DeliveryItemWhereUniqueInput[] | DeliveryItemWhereUniqueInput>;
  disconnect?: Maybe<
    DeliveryItemWhereUniqueInput[] | DeliveryItemWhereUniqueInput
  >;
  update?: Maybe<
    | DeliveryItemUpdateWithWhereUniqueWithoutDeliveryNoteInput[]
    | DeliveryItemUpdateWithWhereUniqueWithoutDeliveryNoteInput
  >;
  upsert?: Maybe<
    | DeliveryItemUpsertWithWhereUniqueWithoutDeliveryNoteInput[]
    | DeliveryItemUpsertWithWhereUniqueWithoutDeliveryNoteInput
  >;
  deleteMany?: Maybe<
    DeliveryItemScalarWhereInput[] | DeliveryItemScalarWhereInput
  >;
  updateMany?: Maybe<
    | DeliveryItemUpdateManyWithWhereNestedInput[]
    | DeliveryItemUpdateManyWithWhereNestedInput
  >;
}

export interface DeliveryNoteCreateInput {
  id?: Maybe<ID_Input>;
  code: String;
  salesOrderId: ID_Input;
  invoiceId: ID_Input;
  userId?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  state: DeliveryStatus;
  deliveryDate?: Maybe<DateTimeInput>;
  items?: Maybe<DeliveryItemCreateManyWithoutDeliveryNoteInput>;
}

export interface DeliveryNoteUpdateInput {
  code?: Maybe<String>;
  salesOrderId?: Maybe<ID_Input>;
  invoiceId?: Maybe<ID_Input>;
  userId?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  state?: Maybe<DeliveryStatus>;
  deliveryDate?: Maybe<DateTimeInput>;
  items?: Maybe<DeliveryItemUpdateManyWithoutDeliveryNoteInput>;
}

export interface DeliveryNoteUpsertWithoutItemsInput {
  update: DeliveryNoteUpdateWithoutItemsDataInput;
  create: DeliveryNoteCreateWithoutItemsInput;
}

export interface DeliveryNoteSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<DeliveryNoteWhereInput>;
  AND?: Maybe<
    DeliveryNoteSubscriptionWhereInput[] | DeliveryNoteSubscriptionWhereInput
  >;
  OR?: Maybe<
    DeliveryNoteSubscriptionWhereInput[] | DeliveryNoteSubscriptionWhereInput
  >;
  NOT?: Maybe<
    DeliveryNoteSubscriptionWhereInput[] | DeliveryNoteSubscriptionWhereInput
  >;
}

export interface DeliveryNoteUpdateManyMutationInput {
  code?: Maybe<String>;
  salesOrderId?: Maybe<ID_Input>;
  invoiceId?: Maybe<ID_Input>;
  userId?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  state?: Maybe<DeliveryStatus>;
  deliveryDate?: Maybe<DateTimeInput>;
}

export interface DeliveryItemCreateInput {
  id?: Maybe<ID_Input>;
  deliveryNote: DeliveryNoteCreateOneWithoutItemsInput;
  productId: ID_Input;
  itemId: ID_Input;
  boxNum: Int;
}

export interface DeliveryItemUpdateManyWithWhereNestedInput {
  where: DeliveryItemScalarWhereInput;
  data: DeliveryItemUpdateManyDataInput;
}

export interface DeliveryNoteCreateOneWithoutItemsInput {
  create?: Maybe<DeliveryNoteCreateWithoutItemsInput>;
  connect?: Maybe<DeliveryNoteWhereUniqueInput>;
}

export interface DeliveryItemUpsertWithWhereUniqueWithoutDeliveryNoteInput {
  where: DeliveryItemWhereUniqueInput;
  update: DeliveryItemUpdateWithoutDeliveryNoteDataInput;
  create: DeliveryItemCreateWithoutDeliveryNoteInput;
}

export interface DeliveryNoteCreateWithoutItemsInput {
  id?: Maybe<ID_Input>;
  code: String;
  salesOrderId: ID_Input;
  invoiceId: ID_Input;
  userId?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  state: DeliveryStatus;
  deliveryDate?: Maybe<DateTimeInput>;
}

export interface DeliveryItemUpdateWithoutDeliveryNoteDataInput {
  productId?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
}

export interface DeliveryItemCreateWithoutDeliveryNoteInput {
  id?: Maybe<ID_Input>;
  productId: ID_Input;
  itemId: ID_Input;
  boxNum: Int;
}

export interface DeliveryNoteWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  code?: Maybe<String>;
  code_not?: Maybe<String>;
  code_in?: Maybe<String[] | String>;
  code_not_in?: Maybe<String[] | String>;
  code_lt?: Maybe<String>;
  code_lte?: Maybe<String>;
  code_gt?: Maybe<String>;
  code_gte?: Maybe<String>;
  code_contains?: Maybe<String>;
  code_not_contains?: Maybe<String>;
  code_starts_with?: Maybe<String>;
  code_not_starts_with?: Maybe<String>;
  code_ends_with?: Maybe<String>;
  code_not_ends_with?: Maybe<String>;
  salesOrderId?: Maybe<ID_Input>;
  salesOrderId_not?: Maybe<ID_Input>;
  salesOrderId_in?: Maybe<ID_Input[] | ID_Input>;
  salesOrderId_not_in?: Maybe<ID_Input[] | ID_Input>;
  salesOrderId_lt?: Maybe<ID_Input>;
  salesOrderId_lte?: Maybe<ID_Input>;
  salesOrderId_gt?: Maybe<ID_Input>;
  salesOrderId_gte?: Maybe<ID_Input>;
  salesOrderId_contains?: Maybe<ID_Input>;
  salesOrderId_not_contains?: Maybe<ID_Input>;
  salesOrderId_starts_with?: Maybe<ID_Input>;
  salesOrderId_not_starts_with?: Maybe<ID_Input>;
  salesOrderId_ends_with?: Maybe<ID_Input>;
  salesOrderId_not_ends_with?: Maybe<ID_Input>;
  invoiceId?: Maybe<ID_Input>;
  invoiceId_not?: Maybe<ID_Input>;
  invoiceId_in?: Maybe<ID_Input[] | ID_Input>;
  invoiceId_not_in?: Maybe<ID_Input[] | ID_Input>;
  invoiceId_lt?: Maybe<ID_Input>;
  invoiceId_lte?: Maybe<ID_Input>;
  invoiceId_gt?: Maybe<ID_Input>;
  invoiceId_gte?: Maybe<ID_Input>;
  invoiceId_contains?: Maybe<ID_Input>;
  invoiceId_not_contains?: Maybe<ID_Input>;
  invoiceId_starts_with?: Maybe<ID_Input>;
  invoiceId_not_starts_with?: Maybe<ID_Input>;
  invoiceId_ends_with?: Maybe<ID_Input>;
  invoiceId_not_ends_with?: Maybe<ID_Input>;
  userId?: Maybe<ID_Input>;
  userId_not?: Maybe<ID_Input>;
  userId_in?: Maybe<ID_Input[] | ID_Input>;
  userId_not_in?: Maybe<ID_Input[] | ID_Input>;
  userId_lt?: Maybe<ID_Input>;
  userId_lte?: Maybe<ID_Input>;
  userId_gt?: Maybe<ID_Input>;
  userId_gte?: Maybe<ID_Input>;
  userId_contains?: Maybe<ID_Input>;
  userId_not_contains?: Maybe<ID_Input>;
  userId_starts_with?: Maybe<ID_Input>;
  userId_not_starts_with?: Maybe<ID_Input>;
  userId_ends_with?: Maybe<ID_Input>;
  userId_not_ends_with?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  customerId_not?: Maybe<ID_Input>;
  customerId_in?: Maybe<ID_Input[] | ID_Input>;
  customerId_not_in?: Maybe<ID_Input[] | ID_Input>;
  customerId_lt?: Maybe<ID_Input>;
  customerId_lte?: Maybe<ID_Input>;
  customerId_gt?: Maybe<ID_Input>;
  customerId_gte?: Maybe<ID_Input>;
  customerId_contains?: Maybe<ID_Input>;
  customerId_not_contains?: Maybe<ID_Input>;
  customerId_starts_with?: Maybe<ID_Input>;
  customerId_not_starts_with?: Maybe<ID_Input>;
  customerId_ends_with?: Maybe<ID_Input>;
  customerId_not_ends_with?: Maybe<ID_Input>;
  state?: Maybe<DeliveryStatus>;
  state_not?: Maybe<DeliveryStatus>;
  state_in?: Maybe<DeliveryStatus[] | DeliveryStatus>;
  state_not_in?: Maybe<DeliveryStatus[] | DeliveryStatus>;
  deliveryDate?: Maybe<DateTimeInput>;
  deliveryDate_not?: Maybe<DateTimeInput>;
  deliveryDate_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  deliveryDate_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  deliveryDate_lt?: Maybe<DateTimeInput>;
  deliveryDate_lte?: Maybe<DateTimeInput>;
  deliveryDate_gt?: Maybe<DateTimeInput>;
  deliveryDate_gte?: Maybe<DateTimeInput>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  items_every?: Maybe<DeliveryItemWhereInput>;
  items_some?: Maybe<DeliveryItemWhereInput>;
  items_none?: Maybe<DeliveryItemWhereInput>;
  AND?: Maybe<DeliveryNoteWhereInput[] | DeliveryNoteWhereInput>;
  OR?: Maybe<DeliveryNoteWhereInput[] | DeliveryNoteWhereInput>;
  NOT?: Maybe<DeliveryNoteWhereInput[] | DeliveryNoteWhereInput>;
}

export interface DeliveryNoteUpdateOneRequiredWithoutItemsInput {
  create?: Maybe<DeliveryNoteCreateWithoutItemsInput>;
  update?: Maybe<DeliveryNoteUpdateWithoutItemsDataInput>;
  upsert?: Maybe<DeliveryNoteUpsertWithoutItemsInput>;
  connect?: Maybe<DeliveryNoteWhereUniqueInput>;
}

export interface DeliveryItemUpdateManyDataInput {
  productId?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
}

export interface DeliveryItemCreateManyWithoutDeliveryNoteInput {
  create?: Maybe<
    | DeliveryItemCreateWithoutDeliveryNoteInput[]
    | DeliveryItemCreateWithoutDeliveryNoteInput
  >;
  connect?: Maybe<
    DeliveryItemWhereUniqueInput[] | DeliveryItemWhereUniqueInput
  >;
}

export interface DeliveryItemUpdateManyMutationInput {
  productId?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
}

export interface DeliveryItemWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  deliveryNote?: Maybe<DeliveryNoteWhereInput>;
  productId?: Maybe<ID_Input>;
  productId_not?: Maybe<ID_Input>;
  productId_in?: Maybe<ID_Input[] | ID_Input>;
  productId_not_in?: Maybe<ID_Input[] | ID_Input>;
  productId_lt?: Maybe<ID_Input>;
  productId_lte?: Maybe<ID_Input>;
  productId_gt?: Maybe<ID_Input>;
  productId_gte?: Maybe<ID_Input>;
  productId_contains?: Maybe<ID_Input>;
  productId_not_contains?: Maybe<ID_Input>;
  productId_starts_with?: Maybe<ID_Input>;
  productId_not_starts_with?: Maybe<ID_Input>;
  productId_ends_with?: Maybe<ID_Input>;
  productId_not_ends_with?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  itemId_not?: Maybe<ID_Input>;
  itemId_in?: Maybe<ID_Input[] | ID_Input>;
  itemId_not_in?: Maybe<ID_Input[] | ID_Input>;
  itemId_lt?: Maybe<ID_Input>;
  itemId_lte?: Maybe<ID_Input>;
  itemId_gt?: Maybe<ID_Input>;
  itemId_gte?: Maybe<ID_Input>;
  itemId_contains?: Maybe<ID_Input>;
  itemId_not_contains?: Maybe<ID_Input>;
  itemId_starts_with?: Maybe<ID_Input>;
  itemId_not_starts_with?: Maybe<ID_Input>;
  itemId_ends_with?: Maybe<ID_Input>;
  itemId_not_ends_with?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
  boxNum_not?: Maybe<Int>;
  boxNum_in?: Maybe<Int[] | Int>;
  boxNum_not_in?: Maybe<Int[] | Int>;
  boxNum_lt?: Maybe<Int>;
  boxNum_lte?: Maybe<Int>;
  boxNum_gt?: Maybe<Int>;
  boxNum_gte?: Maybe<Int>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<DeliveryItemWhereInput[] | DeliveryItemWhereInput>;
  OR?: Maybe<DeliveryItemWhereInput[] | DeliveryItemWhereInput>;
  NOT?: Maybe<DeliveryItemWhereInput[] | DeliveryItemWhereInput>;
}

export interface DeliveryNoteUpdateWithoutItemsDataInput {
  code?: Maybe<String>;
  salesOrderId?: Maybe<ID_Input>;
  invoiceId?: Maybe<ID_Input>;
  userId?: Maybe<ID_Input>;
  customerId?: Maybe<ID_Input>;
  state?: Maybe<DeliveryStatus>;
  deliveryDate?: Maybe<DateTimeInput>;
}

export interface DeliveryItemScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  productId?: Maybe<ID_Input>;
  productId_not?: Maybe<ID_Input>;
  productId_in?: Maybe<ID_Input[] | ID_Input>;
  productId_not_in?: Maybe<ID_Input[] | ID_Input>;
  productId_lt?: Maybe<ID_Input>;
  productId_lte?: Maybe<ID_Input>;
  productId_gt?: Maybe<ID_Input>;
  productId_gte?: Maybe<ID_Input>;
  productId_contains?: Maybe<ID_Input>;
  productId_not_contains?: Maybe<ID_Input>;
  productId_starts_with?: Maybe<ID_Input>;
  productId_not_starts_with?: Maybe<ID_Input>;
  productId_ends_with?: Maybe<ID_Input>;
  productId_not_ends_with?: Maybe<ID_Input>;
  itemId?: Maybe<ID_Input>;
  itemId_not?: Maybe<ID_Input>;
  itemId_in?: Maybe<ID_Input[] | ID_Input>;
  itemId_not_in?: Maybe<ID_Input[] | ID_Input>;
  itemId_lt?: Maybe<ID_Input>;
  itemId_lte?: Maybe<ID_Input>;
  itemId_gt?: Maybe<ID_Input>;
  itemId_gte?: Maybe<ID_Input>;
  itemId_contains?: Maybe<ID_Input>;
  itemId_not_contains?: Maybe<ID_Input>;
  itemId_starts_with?: Maybe<ID_Input>;
  itemId_not_starts_with?: Maybe<ID_Input>;
  itemId_ends_with?: Maybe<ID_Input>;
  itemId_not_ends_with?: Maybe<ID_Input>;
  boxNum?: Maybe<Int>;
  boxNum_not?: Maybe<Int>;
  boxNum_in?: Maybe<Int[] | Int>;
  boxNum_not_in?: Maybe<Int[] | Int>;
  boxNum_lt?: Maybe<Int>;
  boxNum_lte?: Maybe<Int>;
  boxNum_gt?: Maybe<Int>;
  boxNum_gte?: Maybe<Int>;
  createdAt?: Maybe<DateTimeInput>;
  createdAt_not?: Maybe<DateTimeInput>;
  createdAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  createdAt_lt?: Maybe<DateTimeInput>;
  createdAt_lte?: Maybe<DateTimeInput>;
  createdAt_gt?: Maybe<DateTimeInput>;
  createdAt_gte?: Maybe<DateTimeInput>;
  updatedAt?: Maybe<DateTimeInput>;
  updatedAt_not?: Maybe<DateTimeInput>;
  updatedAt_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  updatedAt_lt?: Maybe<DateTimeInput>;
  updatedAt_lte?: Maybe<DateTimeInput>;
  updatedAt_gt?: Maybe<DateTimeInput>;
  updatedAt_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<DeliveryItemScalarWhereInput[] | DeliveryItemScalarWhereInput>;
  OR?: Maybe<DeliveryItemScalarWhereInput[] | DeliveryItemScalarWhereInput>;
  NOT?: Maybe<DeliveryItemScalarWhereInput[] | DeliveryItemScalarWhereInput>;
}

export interface DeliveryItemSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<DeliveryItemWhereInput>;
  AND?: Maybe<
    DeliveryItemSubscriptionWhereInput[] | DeliveryItemSubscriptionWhereInput
  >;
  OR?: Maybe<
    DeliveryItemSubscriptionWhereInput[] | DeliveryItemSubscriptionWhereInput
  >;
  NOT?: Maybe<
    DeliveryItemSubscriptionWhereInput[] | DeliveryItemSubscriptionWhereInput
  >;
}

export interface DeliveryItemUpdateWithWhereUniqueWithoutDeliveryNoteInput {
  where: DeliveryItemWhereUniqueInput;
  data: DeliveryItemUpdateWithoutDeliveryNoteDataInput;
}

export type DeliveryNoteWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  code?: Maybe<String>;
}>;

export interface NodeNode {
  id: ID_Output;
}

export interface DeliveryNotePreviousValues {
  id: ID_Output;
  code: String;
  salesOrderId: ID_Output;
  invoiceId: ID_Output;
  userId?: ID_Output;
  customerId?: ID_Output;
  state: DeliveryStatus;
  deliveryDate?: DateTimeOutput;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface DeliveryNotePreviousValuesPromise
  extends Promise<DeliveryNotePreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  salesOrderId: () => Promise<ID_Output>;
  invoiceId: () => Promise<ID_Output>;
  userId: () => Promise<ID_Output>;
  customerId: () => Promise<ID_Output>;
  state: () => Promise<DeliveryStatus>;
  deliveryDate: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface DeliveryNotePreviousValuesSubscription
  extends Promise<AsyncIterator<DeliveryNotePreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  code: () => Promise<AsyncIterator<String>>;
  salesOrderId: () => Promise<AsyncIterator<ID_Output>>;
  invoiceId: () => Promise<AsyncIterator<ID_Output>>;
  userId: () => Promise<AsyncIterator<ID_Output>>;
  customerId: () => Promise<AsyncIterator<ID_Output>>;
  state: () => Promise<AsyncIterator<DeliveryStatus>>;
  deliveryDate: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface DeliveryItemEdge {
  node: DeliveryItem;
  cursor: String;
}

export interface DeliveryItemEdgePromise
  extends Promise<DeliveryItemEdge>,
    Fragmentable {
  node: <T = DeliveryItemPromise>() => T;
  cursor: () => Promise<String>;
}

export interface DeliveryItemEdgeSubscription
  extends Promise<AsyncIterator<DeliveryItemEdge>>,
    Fragmentable {
  node: <T = DeliveryItemSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface DeliveryItemSubscriptionPayload {
  mutation: MutationType;
  node: DeliveryItem;
  updatedFields: String[];
  previousValues: DeliveryItemPreviousValues;
}

export interface DeliveryItemSubscriptionPayloadPromise
  extends Promise<DeliveryItemSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = DeliveryItemPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = DeliveryItemPreviousValuesPromise>() => T;
}

export interface DeliveryItemSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<DeliveryItemSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = DeliveryItemSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = DeliveryItemPreviousValuesSubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface AggregateDeliveryNote {
  count: Int;
}

export interface AggregateDeliveryNotePromise
  extends Promise<AggregateDeliveryNote>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateDeliveryNoteSubscription
  extends Promise<AsyncIterator<AggregateDeliveryNote>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface DeliveryItem {
  id: ID_Output;
  productId: ID_Output;
  itemId: ID_Output;
  boxNum: Int;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface DeliveryItemPromise
  extends Promise<DeliveryItem>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  deliveryNote: <T = DeliveryNotePromise>() => T;
  productId: () => Promise<ID_Output>;
  itemId: () => Promise<ID_Output>;
  boxNum: () => Promise<Int>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface DeliveryItemSubscription
  extends Promise<AsyncIterator<DeliveryItem>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  deliveryNote: <T = DeliveryNoteSubscription>() => T;
  productId: () => Promise<AsyncIterator<ID_Output>>;
  itemId: () => Promise<AsyncIterator<ID_Output>>;
  boxNum: () => Promise<AsyncIterator<Int>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface DeliveryItemNullablePromise
  extends Promise<DeliveryItem | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  deliveryNote: <T = DeliveryNotePromise>() => T;
  productId: () => Promise<ID_Output>;
  itemId: () => Promise<ID_Output>;
  boxNum: () => Promise<Int>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface DeliveryItemPreviousValues {
  id: ID_Output;
  productId: ID_Output;
  itemId: ID_Output;
  boxNum: Int;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface DeliveryItemPreviousValuesPromise
  extends Promise<DeliveryItemPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  productId: () => Promise<ID_Output>;
  itemId: () => Promise<ID_Output>;
  boxNum: () => Promise<Int>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
}

export interface DeliveryItemPreviousValuesSubscription
  extends Promise<AsyncIterator<DeliveryItemPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  productId: () => Promise<AsyncIterator<ID_Output>>;
  itemId: () => Promise<AsyncIterator<ID_Output>>;
  boxNum: () => Promise<AsyncIterator<Int>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface DeliveryItemConnection {
  pageInfo: PageInfo;
  edges: DeliveryItemEdge[];
}

export interface DeliveryItemConnectionPromise
  extends Promise<DeliveryItemConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<DeliveryItemEdge>>() => T;
  aggregate: <T = AggregateDeliveryItemPromise>() => T;
}

export interface DeliveryItemConnectionSubscription
  extends Promise<AsyncIterator<DeliveryItemConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<DeliveryItemEdgeSubscription>>>() => T;
  aggregate: <T = AggregateDeliveryItemSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface DeliveryNoteEdge {
  node: DeliveryNote;
  cursor: String;
}

export interface DeliveryNoteEdgePromise
  extends Promise<DeliveryNoteEdge>,
    Fragmentable {
  node: <T = DeliveryNotePromise>() => T;
  cursor: () => Promise<String>;
}

export interface DeliveryNoteEdgeSubscription
  extends Promise<AsyncIterator<DeliveryNoteEdge>>,
    Fragmentable {
  node: <T = DeliveryNoteSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface DeliveryNoteSubscriptionPayload {
  mutation: MutationType;
  node: DeliveryNote;
  updatedFields: String[];
  previousValues: DeliveryNotePreviousValues;
}

export interface DeliveryNoteSubscriptionPayloadPromise
  extends Promise<DeliveryNoteSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = DeliveryNotePromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = DeliveryNotePreviousValuesPromise>() => T;
}

export interface DeliveryNoteSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<DeliveryNoteSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = DeliveryNoteSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = DeliveryNotePreviousValuesSubscription>() => T;
}

export interface AggregateDeliveryItem {
  count: Int;
}

export interface AggregateDeliveryItemPromise
  extends Promise<AggregateDeliveryItem>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateDeliveryItemSubscription
  extends Promise<AsyncIterator<AggregateDeliveryItem>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface DeliveryNote {
  id: ID_Output;
  code: String;
  salesOrderId: ID_Output;
  invoiceId: ID_Output;
  userId?: ID_Output;
  customerId?: ID_Output;
  state: DeliveryStatus;
  deliveryDate?: DateTimeOutput;
  createdAt: DateTimeOutput;
  updatedAt: DateTimeOutput;
}

export interface DeliveryNotePromise
  extends Promise<DeliveryNote>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  salesOrderId: () => Promise<ID_Output>;
  invoiceId: () => Promise<ID_Output>;
  userId: () => Promise<ID_Output>;
  customerId: () => Promise<ID_Output>;
  state: () => Promise<DeliveryStatus>;
  deliveryDate: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  items: <T = FragmentableArray<DeliveryItem>>(args?: {
    where?: DeliveryItemWhereInput;
    orderBy?: DeliveryItemOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface DeliveryNoteSubscription
  extends Promise<AsyncIterator<DeliveryNote>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  code: () => Promise<AsyncIterator<String>>;
  salesOrderId: () => Promise<AsyncIterator<ID_Output>>;
  invoiceId: () => Promise<AsyncIterator<ID_Output>>;
  userId: () => Promise<AsyncIterator<ID_Output>>;
  customerId: () => Promise<AsyncIterator<ID_Output>>;
  state: () => Promise<AsyncIterator<DeliveryStatus>>;
  deliveryDate: () => Promise<AsyncIterator<DateTimeOutput>>;
  createdAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  updatedAt: () => Promise<AsyncIterator<DateTimeOutput>>;
  items: <T = Promise<AsyncIterator<DeliveryItemSubscription>>>(args?: {
    where?: DeliveryItemWhereInput;
    orderBy?: DeliveryItemOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface DeliveryNoteNullablePromise
  extends Promise<DeliveryNote | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  salesOrderId: () => Promise<ID_Output>;
  invoiceId: () => Promise<ID_Output>;
  userId: () => Promise<ID_Output>;
  customerId: () => Promise<ID_Output>;
  state: () => Promise<DeliveryStatus>;
  deliveryDate: () => Promise<DateTimeOutput>;
  createdAt: () => Promise<DateTimeOutput>;
  updatedAt: () => Promise<DateTimeOutput>;
  items: <T = FragmentableArray<DeliveryItem>>(args?: {
    where?: DeliveryItemWhereInput;
    orderBy?: DeliveryItemOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface DeliveryNoteConnection {
  pageInfo: PageInfo;
  edges: DeliveryNoteEdge[];
}

export interface DeliveryNoteConnectionPromise
  extends Promise<DeliveryNoteConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<DeliveryNoteEdge>>() => T;
  aggregate: <T = AggregateDeliveryNotePromise>() => T;
}

export interface DeliveryNoteConnectionSubscription
  extends Promise<AsyncIterator<DeliveryNoteConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<DeliveryNoteEdgeSubscription>>>() => T;
  aggregate: <T = AggregateDeliveryNoteSubscription>() => T;
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
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

/**
 * Type Defs
 */

export const prisma: Prisma;
