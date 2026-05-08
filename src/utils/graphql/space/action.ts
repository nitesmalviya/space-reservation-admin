
"use server";
import {  
        SpacesInput, 
        SpaceStatsInput, 
        SpaceStatsResponse, 
        SpacesResponse, 
        CreateSpaceInput, 
        UpdateSpaceInput, 
        UpdateSpaceResponse } 
from "@/types/space-type";
import { fetchGraphQLMutation, fetchGraphQLQuery } from "..";
import { CREATE_SPACES_MUTATION, GET_SPACE_STATS_QUERY, GET_SPACES_QUERY, REMOVE_SPACES_MUTATION, UPDATE_SPACES_MUTATION } from './query';

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

// Get all spaces action
export const getAllSpaceAction = async (
  variables: SpacesInput,
): Promise<SpacesResponse> => {
  const res = await fetchGraphQLQuery<SpacesResponse>(
    GET_SPACES_QUERY,
    { ...variables },
  );
  return res;
};

// Create space action
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