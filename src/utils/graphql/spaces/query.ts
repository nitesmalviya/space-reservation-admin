import { gql, DocumentNode } from "@apollo/client";

export const GET_SPACE_STATS_QUERY: DocumentNode = gql`
query SpaceStats($orgId: ID!) {
  spaceStats(orgId: $orgId) {
    activeSpaces
    avgUtilization
    currentlyOccupied
    totalBookings
    totalSpaces
  }
}`;

export const GET_ALL_SPACES_QUERY: DocumentNode = gql`
query Spaces($filter: SpaceFilterInput) {
  spaces(filter: $filter) {
    currentPage
    message
    success
    totalItems
    totalPages
    items {
      name
      type
      building
      location {
        name
        address
      }
      amenities {
        category
        createdAt
        id
        name
      }
      capacity
      status
      updatedAt
      startTime
      slotDuration
      orgId
      locationId
      id
      createdAt
      endTime
      floor
    }
  }
}


  
`;

export const CREATE_SPACES_MUTATION: DocumentNode = gql`
mutation CreateSpace($input: CreateSpaceInput!) {
  createSpace(input: $input) {
    message
    success
  }
}
  `;