
import { gql, DocumentNode } from "@apollo/client";

// Get Super Admin Analytics Query
export const GET_SUPER_ADMIN_ANALYTICS_QUERY: DocumentNode = gql`
query GetSuperAdminAnalytics {
  getSuperAdminAnalytics {
    bookingsByOrganization {
      bookingsCount
      organizationName
    }
    bookingsBySpace {
      bookingsCount
      percentage
      spaceType
    }
    feedbackTrends {
      avgRating
      month
      totalResponses
    }
    summaryStats {
      avgBookingDuration
      avgSatisfactionScore
      spaceUtilizationRate
    }
  }
}
`;