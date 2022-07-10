// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PurchaseTypeEnum = {
  "MARKETPLACE_PUBLIC": "MARKETPLACE_PUBLIC",
  "MARKETPLACE_PRIVATE": "MARKETPLACE_PRIVATE",
  "DIRECT_VENDOR": "DIRECT_VENDOR"
};

const { License } = initSchema(schema);

export {
  License,
  PurchaseTypeEnum
};