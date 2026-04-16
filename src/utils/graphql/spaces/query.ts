import { gql, DocumentNode } from "@apollo/client";

// Get Space Stats Query
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

// Get All Spaces Query
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
      utilization
    }
  }
}
`;

// Create Space Mutation
export const CREATE_SPACES_MUTATION: DocumentNode = gql`
mutation CreateSpace($input: CreateSpaceInput!) {
  createSpace(input: $input) {
    message
    success
  }
}
  `;



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