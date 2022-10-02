import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export function useRooms(id:string, queries:any) {
	const { data, error, mutate } = useSWR(
		`${process.env.NEXT_PUBLIC_API}/Hotels/groupedAvailabaleRooms/${id}?data.checkIn=${queries.checkin}&data.checkOut=${queries.checkout}&data.promoCode=${queries.promocode}`,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);
	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate,
	};
}
