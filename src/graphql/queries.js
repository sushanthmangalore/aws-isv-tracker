/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLicense = /* GraphQL */ `
  query GetLicense($id: ID!) {
    getLicense(id: $id) {
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
export const listLicenses = /* GraphQL */ `
  query ListLicenses(
    $filter: ModelLicenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLicenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
