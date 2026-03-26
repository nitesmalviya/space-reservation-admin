"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import { GET_ORGANIZATION_ANALYTICS_QUERY } from "./query";
import { OrganizationAnalytics } from "@/types/organization-analytics";
// Get all organization analytics action

export const getOrganizationAnalyticsAction = async (
    variables: any,
): Promise<OrganizationAnalytics> => {
    const res = await fetchGraphQLQuery<OrganizationAnalytics>(
        GET_ORGANIZATION_ANALYTICS_QUERY,
        { ...variables },
    );
    return res;
};