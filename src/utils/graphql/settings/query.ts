

import { gql, DocumentNode } from "@apollo/client";

// Get Notification Settings Query
export const GET_NOTIFICATION_SETTINGS_QUERY: DocumentNode = gql`
query Settings($orgId: String!) {
    notificationSettings(orgId: $orgId) {
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
        message
        success
    }
}`;