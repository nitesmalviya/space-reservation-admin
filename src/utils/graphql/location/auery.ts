


import { gql, DocumentNode } from "@apollo/client";

// Get All Organization Analytics Query
export const GET_LOCATIONS_BY_ORG: DocumentNode = gql`
query LocationsByOrg($filter: SearchFilterInput) {
  locationsByOrg(filter: $filter) {
    currentPage
    locations {
      id
      createdAt
      address
      name
      orgId
      timezone
      updatedAt
      contactNumber
    }
    message
    success
    totalItems
    totalPages
  }
}
`;

// Create location
export const CREATE_LOCATION_MUTATION: DocumentNode = gql`
mutation CreateLocation($createLocationInput: CreateLocationInput!) {
  createLocation(createLocationInput: $createLocationInput) {
    location {
      address
      contactNumber
      createdAt
      name
      orgId
       
      id
      updatedAt
    }
    message
    success
  }
}
`;