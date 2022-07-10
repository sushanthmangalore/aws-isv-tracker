import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PurchaseTypeEnum {
  MARKETPLACE_PUBLIC = "MARKETPLACE_PUBLIC",
  MARKETPLACE_PRIVATE = "MARKETPLACE_PRIVATE",
  DIRECT_VENDOR = "DIRECT_VENDOR"
}



type LicenseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class License {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly purchaseType: PurchaseTypeEnum | keyof typeof PurchaseTypeEnum;
  readonly licenseTerms: string;
  readonly renewalDate: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<License, LicenseMetaData>);
  static copyOf(source: License, mutator: (draft: MutableModel<License, LicenseMetaData>) => MutableModel<License, LicenseMetaData> | void): License;
}