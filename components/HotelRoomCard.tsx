import React, { useState } from "react";
import Image from "next/image";
import StartsBox from "./starts-box";
import { useTranslation } from "next-i18next";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import { ReactI18NextChild } from "react-i18next";

type Props = {
	room: any;
	onSelectRoom: (_data: any) => void;
};

const HotelRoomCard = ({ room, onSelectRoom }: Props) => {
	const { t } = useTranslation(["common", "search", "button"]);
	const inc = (choice: any) => {
		choice.Quantity = choice.Quantity + 1;
		onSelectRoom(choice);
	};
	const dec = (choice: any) => {
		if (!choice.Quantity) {
			choice.Quantity = 0;
		} else {
			choice.Quantity = parseInt(choice.Quantity) - 1;
		}
		onSelectRoom(choice);
	};

	const selectChoice = (choice: any) => {
		choice.selected = true;
		choice.Quantity = 1;
		onSelectRoom(choice);
	};

	return (
		<div className="flex flex-col w-full bg-transparent ">
			<div className="relative h-44 md:h-64 w-full">
				<Image
					alt="hotel"
					src={room?.Image?.secure_url ?? "/images/no-hotel.jpg"}
					layout="fill"
					objectFit="cover"></Image>
			</div>
			<div className="w-full flex flex-col p-4 border border-solid border-primary border-t-0">
				<h2 className="font-bold text-xl pb-2 mb-4">
					{room.RoomTypeNameAr ?? room.RoomTypeName}
				</h2>
				<div className="flex flex-col gap-5">
					{room?.Data?.map((choice: any, idx: number) => (
						<div
							key={idx}
							className=" last:border-0 last:pb-0 border-b border-solid border-primary pb-4 ">
							<div className="flex flex-col gap-2 mb-4">
								<div className="flex items-center gap-2">
									<i className="icon-lit-alternatif text-primary"></i>
									<h1 className="text-sm text-dark">
										{choice.MealAr ?? choice.Meal}
									</h1>
								</div>
								<div className="flex items-center gap-2">
									<i className="icon-blinds-raised text-primary"></i>
									<h1 className="text-sm text-dark">
										{choice.ViewNameAr ?? choice.ViewName}
									</h1>
								</div>
								<div className="text-dark font-bold text-xs">
									{t("common:from")}{" "}
									{format(parseISO(choice.CheckIn), "yyyy-MM-dd")}{" "}
									{t("common:to")}{" "}
									{format(parseISO(choice.CheckOut), "yyyy-MM-dd")}
								</div>
							</div>
							<div className="flex justify-between items-center ">
								<div className="">
									<div className="text-primary font-bold text-xl ">
										{choice.PriceToPay}
										<span className="text-xs text-primary ">
											{t("common:sar")}
										</span>
									</div>
									<div className="text-dark font-bold text-xs">
										{t("search:for-x-nights", {
											nights: choice.NbrNights,
										})}
									</div>
								</div>
								{choice.selected && choice.Quantity > 0 && (
									<div className="w-1/2 flex items-center gap-2">
										<button
											className="btn btn-secondary w-4 h-5 p-5"
											onClick={() => dec(choice)}>
											-
										</button>
										<div className="w-full flex items-center justify-center text-black font-bold">
											{choice.Quantity}
										</div>
										<button
											className="btn btn-secondary w-4 h-5 p-5"
											onClick={() => inc(choice)}>
											+
										</button>
									</div>
								)}

								{(!choice.selected || choice.Quantity == 0) && (
									<button
										className="btn btn-secondary w-36 rounded-3xl"
										onClick={() => selectChoice(choice)}>
										{t("button:book")}
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HotelRoomCard;
