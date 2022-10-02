import useSWRInfinite from 'swr/infinite';
import { pageSize } from '../constants';

import { fetcher } from '../utils/fetcher';

const getKey = (pageIndex: number) => {
  return `${
    process.env.NEXT_PUBLIC_API
  }/Hotels/GetHotels?rows=${pageSize}&page=${pageIndex + 1}`; // SWR key
};

export function useHotels() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => getKey(index),
    fetcher,
    {
      initialSize: 1,
      revalidateFirstPage: false,
    }
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    size: size,
    setSize: setSize,
  };
}
