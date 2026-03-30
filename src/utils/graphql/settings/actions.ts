"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import {
    SettingsResponse,
    SettingsInput,
} from "@/types/settings-type";
import { GET_NOTIFICATION_SETTINGS_QUERY, } from "./query";

// Get all space action
export const getNotificationSettingsAction = async (
    orgId: string,
): Promise<SettingsResponse> => {
    const res = await fetchGraphQLQuery<SettingsResponse>(
        GET_NOTIFICATION_SETTINGS_QUERY,
        { orgId },
    );
    return res;
};