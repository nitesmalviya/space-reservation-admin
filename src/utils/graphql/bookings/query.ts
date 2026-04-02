
import { gql, DocumentNode } from "@apollo/client";

// Get All Bookings Query
export const GET_All_BOOKINGS_QUERY: DocumentNode = gql`
query Bookings($filter: BookingFilterInput) {
  bookings(filter: $filter) {
    currentPage
    items {
      startTime
      status
      endTime
      createdAt
      id
      organization {
        name
      }
      user {
        name
      }
      space {
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