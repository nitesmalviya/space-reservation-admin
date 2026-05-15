"use server";
import { CreateLocationInput, LocationsInput, LocationsResponse, CreateLocationResponse, UpdateLocationInput, UpdateLocationResponse, RemoveLocationResponse, RemoveLocationInput } from "@/types/location";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { CREATE_LOCATION_MUTATION, GET_LOCATIONS_BY_ORG_QUERY, REMOVE_LOCATION_MUTATION, UPDATE_LOCATION_MUTATION } from "./query";



// Get all locations action
export const getLocationsByOrgAction = async (
    variables: LocationsInput,
): Promise<LocationsResponse> => {
    const res = await fetchGraphQLQuery<LocationsResponse>(
        GET_LOCATIONS_BY_ORG_QUERY,
        { ...variables },
    );
    return res;
};


// Create location action
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

// Remove location action
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
