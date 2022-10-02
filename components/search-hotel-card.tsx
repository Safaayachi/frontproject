import React from "react";
import Image from "next/image";
import StartsBox from "./starts-box";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {
	hotel: any;
};

const SearchHotelCard = ({ hotel }: Props) => {
	const { t } = useTranslation(["common", "search", "button"]);

	const { query } = useRouter();
	const getPrice = (rooms: any) => {
		const prices = rooms.map((room: any) => {
			return Number(room.PriceToPay);
		});
		return Math.min.apply(Math, prices);
	};

	const getPriceOriginal = (rooms: any) => {
		const prices = rooms.map((room: any) => {
			return Number(room.Price);
		});
		return Math.min.apply(Math, prices);
	};

	const getNights = (rooms: any) => {
		return rooms[0]?.NbrNights;
	};
	return (
		<div className="flex flex-col md:flex-row w-full bg-white">
			<div className="relative h-56 md:h-auto md:min-h-full w-full md:w-1/2">
				<Image
					alt="hotel"
					src={hotel?.DefaultPicture ?? "/images/no-hotel.jpg"}
					layout="fill"
					objectFit="cover"></Image>
			</div>
			<div className="w-full flex flex-col md:w-1/2">
				<div className="w-full p-2.5 md:p-4">
					<div className="space-y-2 border-b-2 border-solid border-dark-tint pb-4">
						<h2 className="font-bold text-xl md:text-3xl">
							{hotel.NameAr ?? hotel.Name}
						</h2>
						<div className="flex justify-start items-center gap-2  ">
							<i className="icon-marker-1 text-dark-tint"></i>
							<div className="text-dark-tint truncate">
								{hotel.AdressAr ?? hotel.Adress}
							</div>
						</div>
						<StartsBox rating={hotel.Stars} />
					</div>
					<div className="flex justify-start items-center gap-2 border-b-2 py-4 border-solid border-dark-tint">
						<i className="icon-enveloppe-1 text-2xl text-secondary"></i>
						<i className="icon-p text-2xl text-secondary"></i>
						<i className="icon-Air-Conditioner text-2xl text-secondary"></i>
						<i className="icon-enveloppe text-2xl text-secondary"></i>
						<i className="icon-Path text-2xl text-secondary"></i>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6 justify-between items-start p-2.5 md:p-4 w-full">
					{hotel.BookableRooms.length > 0 && (
						<div className="text-xl md:text-3xl lg:text-4xl font-bold">
							<div className="text-secondary font-bold flex items-end gap-1">
								{hotel.BookableRooms[0].HasPromocode ? (
									<div className="flex flex-col items-start justify-start">
										<span className="line-through decoration-danger flex items-center gap-1">
											<span>{getPriceOriginal(hotel.BookableRooms)}</span>

											<span className="text-sm text-secondary ">
												{t("common:sar")}{" "}
											</span>
										</span>
										<span className="flex items-center gap-1">
											<span>{getPrice(hotel.BookableRooms)}</span>
											<span className="text-sm text-secondary ">
												{t("common:sar")}{" "}
											</span>
										</span>
									</div>
								) : (
									<div>
										<span>{getPrice(hotel.BookableRooms)}</span>

										<span className="text-sm text-primary ">
											{t("common:sar")}{" "}
										</span>
									</div>
								)}
							</div>
							<div className="text-dark-tint font-bold text-xs">
								{t("search:for-x-nights", {
									nights: getNights(hotel.BookableRooms),
								})}
							</div>
						</div>
					)}
					<Link
						href={{
							pathname: `/hotels/[slug]`,
							query: {
								slug: hotel.Slug,
								...query,
							},
						}}
						passHref
						type="button">
						<button className={`btn btn-secondary lg:w-40 mt-auto`}>
							{t("button:book")}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SearchHotelCard;
