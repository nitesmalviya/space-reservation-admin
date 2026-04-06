import { PAGINATION_LIMIT } from "@/utils/constant";


export interface paginationType {
  page: number;
  limit: number;
  search: string;
}

export const DEFAULT_PAGINATION: paginationType = {
  page: PAGINATION_LIMIT.PAGE,
  limit: PAGINATION_LIMIT.LIMIT,
  search: "",
};