
import { gql, DocumentNode } from "@apollo/client";


// GET ALL DASHBOARD DATA
export const GET_SUPER_ADMIN_DASHBOARD_QUERY: DocumentNode = gql`

query SuperAdminDashboard {
  superAdminDashboard {
    dashboard {
      overviewStats {
        totalEmployees
        totalBookings
        totalOrganizations
        upcomingBookingsCount
        upcomingBookingsPeriod
      }
      recentOrganizations {
        domain
        employeeCount
        id
        industry
        joinedDate
        name
        status
      }
      upcomingBookings {
        bookingDate
        endTime
        id
        organizationName
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
`;