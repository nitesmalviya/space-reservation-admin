
import { gql, DocumentNode } from "@apollo/client";

export const GET_BOOKING_RULES_QUERY: DocumentNode = gql`
query BookingRules($orgId: String!) {
  bookingRules(orgId: $orgId) {
    data {
      cancellationWindow
      bufferTime
      autoApproveBookings
      advanceBookingWindow
      minNoticePeriod
    }
    message
    success
  }
}
`;

// UPDATE Booking rules
export const UPDATE_BOOKINGRULES_MUTATIONS: DocumentNode = gql`
mutation UpdateBookingRules($input: UpdateBookingRulesInput!) {
  updateBookingRules(input: $input) {
    success
    message
  }
}
  `;

