'use server';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';
import { config } from '@/utils/config';
import { DocumentNode } from '@apollo/client';

const graphqlClient = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  const endpoint = config?.API_URL ?? '';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  // Only add Authorization header if token exists
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return new GraphQLClient(endpoint, {
    headers
  });
};

export const fetchGraphQLQuery = async <
  T,
  V extends Record<string, unknown> = Record<string, unknown>
>(
  query: DocumentNode,
  variables?: V
): Promise<any> => {
  try {
    const res = await (await graphqlClient()).request<T>(query, variables ?? ({} as V));
    return res;
  } catch (error: any) {
    if (error?.response) {
      const graphqlError = error?.response?.errors?.[0];
      throw new Error(graphqlError.message);
    } else {
      throw new Error('Network Error: Unable to connect to the server');
    }
  }
};

export const fetchGraphQLMutation = async <
  T,
  V extends Record<string, unknown> = Record<string, unknown>
>(
  mutation: DocumentNode,
  variables?: V
): Promise<any> => {
  try {
    const client = await graphqlClient();
    const res = await client.request<T>(mutation, variables ?? ({} as V));
    return res;
  } catch (error: any) {
    if (error?.response) {
      const graphqlError = error?.response?.errors?.[0];
      return { success: false, message: graphqlError.message }
    } else {
      return { success: false, message: 'An unexpected error occurred. Please try again, or log out and log back in.' }
    }
  }
};