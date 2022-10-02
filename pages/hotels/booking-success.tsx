import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import HeadSeo from "../../components/HeadSeo";
import Layout from "../../components/layout";
import StartsBox from "../../components/starts-box";
import siteMetadata from "../../data/siteMetadata";
import nextI18NextConfig from "../../i18n/next-i18next.config";

const BookingSuccess: NextPage = () => {
	const { t, i18n } = useTranslation([
		"common",
		"button",
		"home",
		"input",
		"validation",
		"booking",
	]);
	const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
		useLocalStorage("chosenRooms", []);
	let isOneRoomRequest;
	if (chosenRoomsStorage) {
		isOneRoomRequest = false;
		chosenRoomsStorage.forEach((room:any) => {
			if (room.Request === true) {
				isOneRoomRequest = true;
			}
		});
	}
	const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
		"guestInfo",
		{ FirstName: "", LastName: "", Phone: 0, Email: "", Comment: "" }
	);
	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel", {
		NameAr: "",
		Name: "",
		Stars: 0,
		AdressAr: "",
		Adress: "",
		DefaultPicture: "",
	});

	let totalPrice = 0;
	let totalWithoutVat = 0;
	let totalVAT = 0;

	if (chosenRoomsStorage) {
		chosenRoomsStorage.forEach((x: any) => {
			totalPrice = totalPrice + x.PriceToPay * x.Quantity;
		});
	}
	totalVAT = totalPrice * 0.15;
	totalWithoutVat = totalPrice - totalVAT;
	return (
		<>
			<HeadSeo
				title={
					isOneRoomRequest ? t("validation:request") : t("validation:success")
				}
				description={t("home:tawaf")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="pt-16 lg:pt-40">
					<section className="flex flex-col gap-4 justify-start container sm:mx-auto px-6 lg:px-10 py-10">
						<div className="bg-white text-dark py-3 z-10 w-full flex items-center gap-4">
							<i className="icon-check_circle_outline_black_24dp text-3xl md:text-5xl text-secondary"></i>
							<p className=" text-base md:text-2xl font-bold ">
								{isOneRoomRequest
									? t("validation:success-request")
									: t("validation:success-book")}
							</p>
						</div>
						<div className="w-full gap-0.5 relative flex flex-col-reverse lg:flex-row justify-between">
							{/* Start Booking Card */}
							<div className="flex flex-col bg-secondary w-full lg:w-2/3 h-fit overflow-hidden">
								<div className="relative h-80 md:min-h-full w-full">
									<Image
										alt="hotel"
										src={
											selectedHotelStorage?.DefaultPicture
												? selectedHotelStorage.DefaultPicture
												: "/images/no-hotel.jpg"
										}
										layout="fill"
										objectFit="cover"></Image>
								</div>

								<div className="w-full flex flex-col">
									<div className=" w-full p-4 text-white">
										<div className="border-b border-solid border-dark-tint px-4 space-y-4">
											<div className="flex justify-start md:items-center pb-2 md:mb-4 gap-2 md:gap-4 items-start flex-col md:flex-row">
												<h2 className="font-bold text-xl md:text-2xl lg:text-3xl line-clamp-1">
													{i18n.language === "ar"
														? selectedHotelStorage?.NameAr
														: selectedHotelStorage?.Name}
												</h2>
											</div>
											<div className="flex justify-start items-center gap-2">
												<i className="icon-marker-1 text-white"></i>
												<div className="text-sm line-clamp-1">
													{i18n.language === "ar"
														? selectedHotelStorage?.AdressAr ??
														  selectedHotelStorage?.Adress
														: selectedHotelStorage?.Adress}
												</div>
											</div>
											<div className="flex justify-start items-center pb-2">
												{[1, 2, 3, 4, 5].map((value, index) => {
													return (
														<i
															key={index}
															className={`icon-star_black_24dp text-xl ${
																value <= selectedHotelStorage!.Stars
																	? "text-white"
																	: "text-secondary"
															}`}></i>
													);
												})}
											</div>
										</div>
										<div className="flex flex-col p-4 ">
											{chosenRoomsStorage &&
												chosenRoomsStorage.map((room: any, idx: number) => (
													<div key={idx} className="flex flex-col ">
														<h2 className=" font-bold text-sm mt-4">
															{room.Quantity} x{" "}
															{i18n.language === "ar"
																? room.RoomTypeNameAr
																: room.RoomTypeName}
														</h2>
														<div className="flex gap-2 py-4 last:border-0 border-b border-solid border-dark-tint">
															<div className="flex items-center gap-2">
																<i className="icon-restaurant text-white"></i>
																<h1 className="text-sm font-semibold">
																	{i18n.language === "ar"
																		? room.MealAr
																		: room.Meal}
																</h1>
															</div>
															<div className="flex items-center gap-2">
																<i className="icon-blinds-raised text-white"></i>
																<h1 className="text-sm font-semibold">
																	{i18n.language === "ar"
																		? room.ViewNameAr
																		: room.ViewName}
																</h1>
															</div>
														</div>
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
							{/* End Booking Card */}

							{/* Start Booking Info */}
							<div className="p-8 bg-secondary w-full lg:w-1/3 md:h-fit text-white relative">
								<div className="w-8 h-8 hidden lg:block bg-secondary top-1/5 ltr:-left-[17px] rtl:-right-[17px] absolute transform rotate-45 border-t-2 rtl:border-r-2 border-solid border-white "></div>
								<h1 className=" text-3xl font-bold mb-4 font-ruqaa">
									{t("booking:book-info")}
								</h1>
								<div className="flex flex-col ">
									<div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
										<h2 className="font-bold">{t("common:sum")}</h2>
										<div className="text-white font-bold text-2xl ">
											{totalWithoutVat.toFixed(2)}
											<span className=" text-white ">{t("common:sar")}</span>
										</div>
									</div>
									<div className="flex justify-between items-center py-4 border-b border-solid border-dark-tint">
										<h2 className="font-bold">{t("common:TVA")} </h2>
										<div className="text-white font-bold text-2xl ">
											{totalVAT.toFixed(2)}
											<span className=" text-white ">{t("common:sar")}</span>
										</div>
									</div>
									<div className="flex justify-between items-center pt-4">
										<h2 className="text-xl font-bol">{t("common:sum")}</h2>
										<div className="font-bold text-4xl">
											{totalPrice.toFixed(2)}
											<span className="text-white">{t("common:sar")}</span>
										</div>
									</div>
								</div>
							</div>

							{/* End Booking Info */}

							{/* start guest information */}

							{/* end guest information */}
						</div>
						<div className="flex flex-row gap-0.5">
							<div className="w-full lg:w-2/3">
								<div className="p-4 flex flex-col gap-8 bg-white w-full mb-4">
									<h1 className=" text-4xl font-ruqaa font-bold text-secondary">
										{t("booking:guest-data")}
									</h1>

									<div className="grid grid-cols-2 gap-4">
										<div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
											<span className=" font-bold text-sm">
												{t("input:first-name")}
											</span>
											<span className="text-xs"> {guestInfo?.FirstName}</span>
										</div>
										<div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
											<span className=" font-bold text-sm">
												{t("input:last-name")}
											</span>
											<span className="text-xs">{guestInfo?.LastName}</span>
										</div>
										<div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
											<span className=" font-bold text-sm">
												{t("input:email")}
											</span>
											<span className="text-xs">{guestInfo?.Email}</span>
										</div>
										<div className="flex flex-col gap-2 col-span-2 lg:col-span-1">
											<span className=" font-bold text-sm">
												{t("input:phone-number")}
											</span>
											<span className="text-xs"> {guestInfo?.Phone}</span>
										</div>
									</div>
								</div>
								<div className="p-4 flex flex-col gap-8 bg-white ">
									<h1 className="text-4xl font-ruqaa font-bold text-secondary">
										{t("booking:special-demands")} ({t("common:facultative")})
									</h1>
									<div className="flex flex-col gap-2 col-span-2 ">
										<span className="text-xs">{guestInfo?.Comment}</span>
									</div>
								</div>
							</div>
							<div className="hidden lg:block lg:w-1/3"></div>
						</div>
					</section>
				</div>
			</Layout>
		</>
	);
};
export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation", "booking"],
				nextI18NextConfig
			)),
		},
	};
};
export default BookingSuccess;
