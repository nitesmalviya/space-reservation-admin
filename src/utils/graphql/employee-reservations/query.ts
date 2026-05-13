

import { gql, DocumentNode } from "@apollo/client";

// Get All employee reservations data

export const GET_EMPLOYEE_RESERVATIONS_QUERY: DocumentNode = gql`
query EmployeeReservations($filter: BookingFilterInput) {
  employeeReservations(filter: $filter) {
    items {
      bookingDate
      endTime
      startTime
      attendeesCount
      purpose
      status
      id
      space {
        name
        type
        amenities {
          name
        }
      }
      user {
        name
        email
      }
    }
    message
    success
  }
}
`;