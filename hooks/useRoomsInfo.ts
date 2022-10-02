import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export function useRoomsInfo() {
	const { data, error } = useSWR(
		`${process.env.NEXT_PUBLIC_API}/hotels/GetHotelRooms/${process.env.NEXT_PUBLIC_VIOLET_ID}`,
		fetcher
	);
	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
}
