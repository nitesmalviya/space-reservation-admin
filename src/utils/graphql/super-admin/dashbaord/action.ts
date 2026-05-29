"use server";
import { DashboardResponse } from "@/types/dashboard/super-admin";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "../..";
import { GET_SUPER_ADMIN_DASHBOARD_QUERY } from "./query";

//get all dashboard data action
export const getSuperAdminDashboardAction = async () => {
    const res = await fetchGraphQLQuery<DashboardResponse>(
        GET_SUPER_ADMIN_DASHBOARD_QUERY,
    );
    return res;
};