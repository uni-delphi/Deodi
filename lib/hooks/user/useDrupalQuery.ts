// lib/hooks/useDrupalQuery.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { drupalFetch } from "../drupal-fetch";

export function useDrupalQuery<TData = any>(
  key: string[],
  path: string,
  options?: UseQueryOptions<TData>
) {
  return useQuery<TData>({
    queryKey: key,
    queryFn: () => drupalFetch<TData>(path),
    ...options,
  });
}
