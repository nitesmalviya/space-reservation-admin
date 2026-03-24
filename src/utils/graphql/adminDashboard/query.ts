
import { gql, DocumentNode } from "@apollo/client";

// Get All Admin Dashboard Query
export const GET_ALL_ADMIN_DASHBOARD_QUERY: DocumentNode = gql`
query AdminDashboard {
  adminDashboard {
    dashboard {
      overviewStats {
        activeSpaces
        confirmedBookingsCount
        spacesStatus
        totalBookingsCount
        totalEmployees
        upcomingBookingsCount
        upcomingBookingsPeriod
      }
      recentEmployees {
        email
        id
        joinedDate
        name
        role
      }
      spaceUtilization {
        confirmedBookingsCount
        spaceName
        totalBookingsCount
      }
      upcomingBookings {
        endTime
        id
        spaceName
        startTime
        status
        userName
      }
    }
    message
    success
  }
}
  `