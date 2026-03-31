"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import {
    SuperAdminDashboardResponse,
} from "@/types/dashboard/super-admin";
import { GET_ALL_SUPER_ADMIN_DASHBOARD_QUERY } from "./query";
// Get all super admin dashboard action

export const getAllSuperAdminDashboardAction = async (
): Promise<SuperAdminDashboardResponse> => {
    const res = await fetchGraphQLQuery<SuperAdminDashboardResponse>(
        GET_ALL_SUPER_ADMIN_DASHBOARD_QUERY
    );
    return res;
};