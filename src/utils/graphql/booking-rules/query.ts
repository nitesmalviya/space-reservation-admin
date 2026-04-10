import { gql, DocumentNode } from "@apollo/client";

// Get Booking rules
export const GET_BOOKING_RULES_QUERY: DocumentNode = gql`
query BookingRules($orgId: String!) {
  bookingRules(orgId: $orgId) {
    data {
      advanceBookingWindow
      autoApproveBookings
      bufferTime
      cancellationWindow
      id
      minNoticePeriod
      orgId
      requireAdminApproval
    }
    message
    success
  }
}`;


// UPDATE Booking rules
export const UPDATE_BOOKINGRULES_MUTATIONS: DocumentNode = gql`
mutation UpdateBookingRules($input: UpdateBookingRulesInput!) {
  updateBookingRules(input: $input) {
    success
    message
  }
}
  `;