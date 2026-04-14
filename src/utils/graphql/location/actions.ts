
"use server";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";

import { CREATE_LOCATION_MUTATION, GET_LOCATIONS_BY_ORG, REMOVE_LOCATION_MUTATION, UPDATE_LOCATION_MUTATION } from "./auery";
import { CreateLocationInput, CreateLocationResponse, LocationByOrgInput, LocationByOrgResponse, RemoveLocationInput, RemoveLocationResponse, UpdateLocationInput, UpdateLocationResponse } from "@/types/location-type";



// Get location stats action
export const getLocationsByOrgAction = async (
    variables: LocationByOrgInput,
): Promise<LocationByOrgResponse> => {
    const res = await fetchGraphQLQuery<LocationByOrgResponse>(
        GET_LOCATIONS_BY_ORG,
        { ...variables },
    );
    return res;
};

//Create location
export const createLocationAction = async (
    variables: CreateLocationInput,
): Promise<CreateLocationResponse> => {
    const res = await fetchGraphQLMutation<CreateLocationResponse>(
        CREATE_LOCATION_MUTATION,
        {
            createLocationInput: variables,
        },
    );
    return res;
};

// Update location
export const updateLocationAction = async (
    variables: UpdateLocationInput,
): Promise<UpdateLocationResponse> => {
    const res = await fetchGraphQLMutation<UpdateLocationResponse>(
        UPDATE_LOCATION_MUTATION,
        {
            updateLocationInput: variables,
        },
    );
    return res;
};


// Remove location
export const removeLocationAction = async (
    variables: RemoveLocationInput,
): Promise<RemoveLocationResponse> => {
    const res = await fetchGraphQLMutation<RemoveLocationResponse>(
        REMOVE_LOCATION_MUTATION,
        {
            removeLocationId: variables.removeLocationId,
        },
    );
    return res;
};