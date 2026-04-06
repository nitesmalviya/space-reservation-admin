import { gql, DocumentNode } from "@apollo/client";

//CREATE ORGANIZATION

export const CREATE_ORGANIZATION: DocumentNode = gql`
  mutation CreateOrganization(
    $createOrganizationInput: CreateOrganizationInput!
  ) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      message
      success
      organization {
        domain
        employeeCount
        id
        industry
        name
        location {
          id
          name
        }
        primaryAdmin {
          id
          name
        }
        status
        updatedAt
      }
    }
  }
`;

// GET ALL ORGANIZATIONS
export const GET_ALL_ORGANIZATIONS_QUERY: DocumentNode = gql`
  query Organizations($searchFilter: SearchFilterInput) {
    organizations(searchFilter: $searchFilter) {
    currentPage
      message
      success
    totalItems
    totalPages
      organizations {
        employeeCount
        id
        industry
        name
        domain
        status
        location {
          id
          name
        }
        primaryAdmin {
        email
          name
        }
      }
    }
  }
`;

// GET ORGANIZATION BY ID
export const GET_ORGANIZATION_BY_ID_QUERY: DocumentNode = gql`
  query Organization($id: String!) {
    organization(id: $id) {
      contactEmail
      domain
      employeeCount
      employeesCount
      id
      industry
      locationId
      logoUrl
      name
      primaryAdminEmail
      primaryAdminName
      status
      location {
        address
        contactNumber
        id
        name
        orgId
        timezone
      }
      primaryAdmin {
        activeStatus
        email
        id
        name
        orgId
        phoneNumber
        profileImageUrl
        role
        subId
      }
    }
  }
`;

// UPDATE ORGANIZATION
export const UPDATE_ORGANIZATION_QUERY: DocumentNode = gql`
  mutation UpdateOrganization(
    $updateOrganizationInput: UpdateOrganizationInput!
  ) {
    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
      message
      success
      organization {
        contactEmail
        createdAt
        domain
        employeeCount
        employeesCount
        id
        industry
        locationId
        logoUrl
        name
        primaryAdminEmail
        primaryAdminName
        status
      }
    }
  }
`;

// REMOVE ORGANIZATION
export const REMOVE_ORGANIZATION_QUERY: DocumentNode = gql`
  mutation RemoveOrganization($id: String!) {
    removeOrganization(id: $id) {
      message
      success
    }
  }
`;
