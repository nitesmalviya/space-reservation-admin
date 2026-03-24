import { gql, DocumentNode } from "@apollo/client";

// Get employee reservations
export const GET_EMPLOYEE_RESERVATIONS_QUERY: DocumentNode = gql`
query EmployeeReservations($filter: BookingFilterInput) {
  employeeReservations(filter: $filter) {
    currentPage
    items {
      id
      endTime
      status
      startTime
      spaceId
      orgId
      createdAt
      attendeesCount
      purpose
       space {
        name
        type
        location {
          name
          address
        }
      }
      user {
        name
        email
        id
        updatedAt
        createdAt
        activeStatus
      }
    }
    message
    success
    totalItems
    totalPages
  }
}
`;