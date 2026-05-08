import { gql, DocumentNode } from "@apollo/client";


// GET ALL DASHBOARD DATA
export const GET_ALL_ADMIN_DASHBOARD_QUERY: DocumentNode = gql`
query AdminDashboard {
  adminDashboard {
    dashboard {
      overviewStats {
        activeSpaces
        confirmedBookingsCount
        spaceUtilization
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
        utilizationPercentage
      }
      upcomingBookings {
        bookingDate
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
`;