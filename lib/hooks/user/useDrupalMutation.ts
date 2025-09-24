// lib/hooks/useDrupalMutation.ts
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { drupalFetch } from "../../drupal-fetch";

export function useDrupalMutation<TData = any, TVariables = any>(
  path: string,
  options?: UseMutationOptions<TData, unknown, TVariables>
) {
  return useMutation<TData, unknown, TVariables>({
    mutationFn: (variables) =>
      drupalFetch<TData>(path, {
        method: "POST",
        body: JSON.stringify(variables),
      }),
    ...options,
  });
}
