import type { UseQueryOptions } from "react-query";
import { useQuery } from "react-query";

export default function useRequest<
  TResult,
  TKey extends [id: string, ...ids: Array<string | undefined>, ...ids: Array<string | undefined>] = ["common"]
>(
  queryKey: TKey,
  queryFn: () => Promise<TResult>,
  options?: Omit<UseQueryOptions<TResult, unknown, TResult, TKey>, "queryKey" | "queryFn">
) {
  return useQuery(queryKey, () => queryFn(), { suspense: false, ...options }).data;
}
