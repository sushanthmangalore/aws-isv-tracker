// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { License } = initSchema(schema);

export {
  License
};