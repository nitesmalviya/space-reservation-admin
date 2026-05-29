import { gql, DocumentNode } from "@apollo/client";

// GET Settings
export const GET_NOTIDICATIONSETTINGS_QUERY: DocumentNode = gql`
query NotificationSettings($orgId: String!) {
  notificationSettings(orgId: $orgId) {
    message
    settings {
      bookingConfirmationsEnabled
      cancellationAlertsEnabled
      createdAt
      dailyDigestEnabled
      emailNotificationsEnabled
      id
      orgId
      updatedAt
      weeklyReportEnabled
    }
  }
}
`;