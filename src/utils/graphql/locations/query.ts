

import { gql, DocumentNode } from "@apollo/client";

export const GET_LOCATIONS_BY_ORG_QUERY: DocumentNode = gql`
query LocationsByOrg($filter: SearchFilterInput) {
  locationsByOrg(filter: $filter) {
    currentPage
    locations {
      name
      contactNumber
      address
      id
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
    message
    success
  }
}
`;
// Remove location
export const REMOVE_LOCATION_MUTATION: DocumentNode = gql`
mutation RemoveLocation($removeLocationId: String!) {
  removeLocation(id: $removeLocationId) {
    message
    success
  }
}
`;

// Update location
export const UPDATE_LOCATION_MUTATION: DocumentNode = gql`
mutation UpdateLocation($updateLocationInput: UpdateLocationInput!) {
  updateLocation(updateLocationInput: $updateLocationInput) {
    message
    success
  }
}
  `;