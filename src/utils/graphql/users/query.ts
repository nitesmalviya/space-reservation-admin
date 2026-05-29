import { gql, DocumentNode } from "@apollo/client";

// Get all users
export const GET_ALL_USERS_QUERY: DocumentNode = gql`
  query Users($searchFilter: SearchFilterInput) {
  users(searchFilter: $searchFilter) {
    currentPage
    message
    success
    totalItems
    totalPages
    users {
      name
      email
      role
      createdAt
      bookingCount
      activeStatus
      id
       organization {
        name
      }
    }
  }
}
`;

// Update a user
export const UPDATE_USER_MUTATION: DocumentNode = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    message
    success
  }
}
`;


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

// Remove user
export const DELETE_USER_MUTATION: DocumentNode = gql`
mutation RemoveUserById($removeUserByIdId: String!) {
  removeUserById(id: $removeUserByIdId) {
    message
    success
  }
}
`;