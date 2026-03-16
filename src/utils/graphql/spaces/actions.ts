"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import {
    SpacesResponse,
    SpaceStatsInput,
    SpaceStatsResponse,
    SpacesInput,
    CreateSpaceInput,
    CreateSpaceResponse,
    RemoveSpaceInput,
    UpdateSpaceInput,
    UpdateSpaceResponse,
} from "@/types/spaces-type";
import { CREATE_SPACES_MUTATION, GET_ALL_SPACES_QUERY, GET_SPACE_STATS_QUERY, REMOVE_SPACES_MUTATION, UPDATE_SPACES_MUTATION } from "./query";


// Get space stats action
export const getSpaceStatsAction = async (
    variables: SpaceStatsInput,
): Promise<SpaceStatsResponse> => {
    const res = await fetchGraphQLQuery<SpaceStatsResponse>(
        GET_SPACE_STATS_QUERY,
        { ...variables },
    );
    return res;
};


// Get all space action
export const getAllSpaceAction = async (
    variables: SpacesInput,
): Promise<SpacesResponse> => {
    const res = await fetchGraphQLQuery<SpacesResponse>(
        GET_ALL_SPACES_QUERY,
        { ...variables },
    );
    return res;
};


//Create space
export const createSpaceAction = async (
    variables: CreateSpaceInput,
): Promise<any> => {
    const res = await fetchGraphQLMutation<any>(
        CREATE_SPACES_MUTATION,
        {
            input: variables,
        },
    );
    return res;
};

//Remove space
export const removeSpaceAction = async (
    variables: RemoveSpaceInput,
): Promise<any> => {
    const res = await fetchGraphQLMutation<any>(
        REMOVE_SPACES_MUTATION,
        {
            removeSpaceId: variables.id,
        },
    );
    return res;
};

//Update space
export const updateSpaceAction = async (
    variables: UpdateSpaceInput,
): Promise<UpdateSpaceResponse> => {
    const res = await fetchGraphQLMutation<UpdateSpaceResponse>(
        UPDATE_SPACES_MUTATION,
        {
            input: variables,
        },
    );
    return res;
};
