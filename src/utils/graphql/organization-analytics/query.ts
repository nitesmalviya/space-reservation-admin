

import { gql, DocumentNode } from "@apollo/client";

// Get All Organization Analytics Query
export const GET_ORGANIZATION_ANALYTICS_QUERY: DocumentNode = gql`
query GetOrganizationAnalytics($orgId: String) {
  getOrganizationAnalytics(orgId: $orgId) {
    bookingTrends {
      bookingsCount
      month
    }
    peakBookingHours {
      bookingsCount
      hour
    }
    spaceUtilizationReport {
      spaceName
      status
      totalBookings
      totalHours
      utilizationPercentage
    }
    stats {
      activeSpaces
      avgUtilization
      totalBookings
      totalEmployees
    }
    topEmployees {
      bookingsCount
      employeeName
      totalHours
    }
  }
}
  `;


// Export Organization Analytics Query
export const EXPORT_ORGANIZATION_ANALYTICS_QUERY: DocumentNode = gql`
  query Query($format: String!, $filter: ExportFilter, $orgId: String) {
  exportOrganizationAnalytics(format: $format, filter: $filter, orgId: $orgId)
}`;