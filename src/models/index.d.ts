import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LicenseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class License {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly purchaseType: string;
  readonly licenseTerms: string;
  readonly renewalDate: string;
  readonly comments?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<License, LicenseMetaData>);
  static copyOf(source: License, mutator: (draft: MutableModel<License, LicenseMetaData>) => MutableModel<License, LicenseMetaData> | void): License;
}