"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import {
    DELETE_USER_MUTATION,
    GET_ALL_USERS_QUERY,
    UPDATE_USER_MUTATION,
} from "./query";

import {
    AllUsersInput,
    AllUsersResponse,
    RemoveUserInput,
    RemoveUserResponse,
    UpdateUserInput,
    UpdateUserResponse
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

// Remove user
export const removeUserAction = async (
    variables: RemoveUserInput,
): Promise<RemoveUserResponse> => {
    const res = await fetchGraphQLMutation<RemoveUserResponse>(
        DELETE_USER_MUTATION,
        {
            removeUserByIdId: variables.id, // ✅ EXACT MATCH
        },
    );
    return res;
};

//Update user action
export const updateUserAction = async (
    variables: UpdateUserInput,
): Promise<UpdateUserResponse> => {
    const res = await fetchGraphQLMutation<UpdateUserResponse>(
        UPDATE_USER_MUTATION,
        {
            updateUserInput: variables,
        },
    );
    return res;
};