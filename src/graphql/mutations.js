/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLicense = /* GraphQL */ `
  mutation CreateLicense(
    $input: CreateLicenseInput!
    $condition: ModelLicenseConditionInput
  ) {
    createLicense(input: $input, condition: $condition) {
      id
      name
      category
      purchaseType
      licenseTerms
      renewalDate
      comments
      createdAt
      updatedAt
    }
  }
`;
export const updateLicense = /* GraphQL */ `
  mutation UpdateLicense(
    $input: UpdateLicenseInput!
    $condition: ModelLicenseConditionInput
  ) {
    updateLicense(input: $input, condition: $condition) {
      id
      name
      category
      purchaseType
      licenseTerms
      renewalDate
      comments
      createdAt
      updatedAt
    }
  }
`;
export const deleteLicense = /* GraphQL */ `
  mutation DeleteLicense(
    $input: DeleteLicenseInput!
    $condition: ModelLicenseConditionInput
  ) {
    deleteLicense(input: $input, condition: $condition) {
      id
      name
      category
      purchaseType
      licenseTerms
      renewalDate
      comments
      createdAt
      updatedAt
    }
  }
`;
