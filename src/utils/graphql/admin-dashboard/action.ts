"use server";
import { DashboardResponse } from "@/types/dashboard/admin";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { GET_ALL_ADMIN_DASHBOARD_QUERY } from "./query";

//get all dashboard data action
export const getAllAdminDashboardAction = async () => {
  const res = await fetchGraphQLQuery<DashboardResponse>(
    GET_ALL_ADMIN_DASHBOARD_QUERY,
  );
  return res;
};