import { gql, DocumentNode } from "@apollo/client";

// Get all users
export const GET_ALL_USERS_QUERY: DocumentNode = gql`
  query Users($searchFilter: SearchFilterInput) {
    users (searchFilter: $searchFilter){
        activeStatus
        createdAt
        email
        id
        name
        orgId
        phoneNumber
        profileImageUrl
        role
        subId
        updatedAt
    }
}
`;