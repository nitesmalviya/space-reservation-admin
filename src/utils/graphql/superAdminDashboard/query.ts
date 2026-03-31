
import { gql, DocumentNode } from "@apollo/client";

// Get All Admin Dashboard Query
export const GET_ALL_SUPER_ADMIN_DASHBOARD_QUERY: DocumentNode = gql`
query SuperAdminDashboard {
  superAdminDashboard {
    dashboard {
      overviewStats {
        totalBookings
        totalEmployees
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