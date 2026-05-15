import { gql, DocumentNode } from "@apollo/client";


// GET Organization Analytics
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