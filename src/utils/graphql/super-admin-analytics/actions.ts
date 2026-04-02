"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_SUPER_ADMIN_ANALYTICS_QUERY } from "./query";
import { SuperAdminAnalyticsDataResponse } from "@/types/super-admin-analytics";

// Get super admin analytics action
export const getSuperAdminAnalyticsAction = async (
): Promise<SuperAdminAnalyticsDataResponse> => {
    const res = await fetchGraphQLQuery<SuperAdminAnalyticsDataResponse>(
        GET_SUPER_ADMIN_ANALYTICS_QUERY
    );
    return res;
};