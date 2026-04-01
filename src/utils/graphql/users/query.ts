import { gql, DocumentNode } from "@apollo/client";

// Get all users
export const GET_ALL_USERS_QUERY: DocumentNode = gql`
query Users($searchFilter: SearchFilterInput) {
  users(searchFilter: $searchFilter) {
    currentPage
    message
    stats {
      activeEmployees
      newThisMonth
      totalEmployees
    }
    success
    totalItems
    totalPages
    users {
      name
      role
      id
      email
      createdAt
      activeStatus
      organization {
        name
      }
    }
  }
}
`;

// Delete user
export const DELETE_USER_MUTATION: DocumentNode = gql`
mutation RemoveUserById($removeUserByIdId: String!) {
  removeUserById(id: $removeUserByIdId) {
    message
    success
  }
}
`;

// Update user
export const UPDATE_USER_MUTATION: DocumentNode = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    message
    success
    user {
      id
      email
      name
      role
    }
  }
}
`;


