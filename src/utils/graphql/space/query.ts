import { gql, DocumentNode } from "@apollo/client";

// Get All space stats data
export const GET_SPACE_STATS_QUERY: DocumentNode = gql`
query SpaceStats($orgId: ID!) {
  spaceStats(orgId: $orgId) {
    activeSpaces
    avgUtilization
    currentlyOccupied
    totalBookings
    totalSpaces
  }
}
`;

export const GET_SPACES_QUERY: DocumentNode = gql`
query Spaces($filter: SpaceFilterInput) {
  spaces(filter: $filter) {
    currentPage
    items {
      name
      status
      orgId
      id
      location {
        name
        address
        id
      }
      capacity
      type
      utilization
      startTime
      endTime
       wing
      floor
      building
      bookingsThisMonth
      amenities {
        id
        name
        category
      }
      organization {
        name
      }
    }
    message
    success
    totalItems
    totalPages
  }
}
`;

export const CREATE_SPACES_MUTATION: DocumentNode = gql`
mutation CreateSpace($input: CreateSpaceInput!) {
  createSpace(input: $input) {
    message
    success
  }
}`;

// Remove Space Mutation
export const REMOVE_SPACES_MUTATION: DocumentNode = gql`
  mutation RemoveSpace($removeSpaceId: String!) {
  removeSpace(id: $removeSpaceId) {
    message
    success
  }
} `;

export const UPDATE_SPACES_MUTATION: DocumentNode = gql`
mutation UpdateSpace($input: UpdateSpaceInput!) {
  updateSpace(input: $input) {
    data {
      capacity
      id
      name
      amenities {
        id
        name
        category
      }
    }
    message
    success
  }
}`;