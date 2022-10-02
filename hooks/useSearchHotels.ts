import { pageSize } from './../constants';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../utils/fetcher';
const getKey = (queries: any) => {
  return `${
    process.env.NEXT_PUBLIC_API
  }/Hotels/SearchHotels?${new URLSearchParams({
    ...(queries as { [x: string]: string }),
  })}&rows=${pageSize}`; // SWR key
};
export function useSearchHotels(queries: any) {
  const { data, error, mutate, size, setSize } = useSWRInfinite(
    () => getKey(queries),
    fetcher,
    { initialSize: 1 }
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate,
    size: size,
    setSize: setSize,
  };
}
