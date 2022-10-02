import useSWR from "swr"
import { fetcher } from "../utils/fetcher"

export function useFacilities() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/Hotels/getFacilities`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  }
}
