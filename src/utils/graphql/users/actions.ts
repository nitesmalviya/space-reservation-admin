"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {
    GET_ALL_USERS_QUERY,
} from "./query";

import {
    AllUsersInput,
    AllUsersResponse,
} from "@/types/users-type";


//get all organizations action
export const getAllUsersAction = async (
    variables: AllUsersInput,
): Promise<AllUsersResponse> => {
    const res = await fetchGraphQLQuery<AllUsersResponse>(
        GET_ALL_USERS_QUERY,
        { ...variables },
    );
    return res;
};
