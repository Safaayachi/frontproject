import { GetServerSideProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import { useLocalStorage } from "react-use";

import HotelRoomCard from "../../components/HotelRoomCard";
import HotelSearch from "../../components/hotels-search";
import Layout from "../../components/layout";
import RoomCardsTable from "../../components/RoomCardsTable";
import StartsBox from "../../components/starts-box";
import nextI18NextConfig from "../../i18n/next-i18next.config";
import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import HeadSeo from "../../components/HeadSeo";
import siteMetadata from "../../data/siteMetadata";
import LoadingCard from "../../components/LoadingCard";
import { useRooms } from "../../hooks/useRooms";
import Link from "next/link";

const Details: NextPage<{
	hotel: any;
	queries: any;
	serverRooms: any;
}> = ({ hotel }) => {
	const { t, i18n } = useTranslation([
		"common",
		"button",
		"home",
		"input",
		"search",
		"hotel",
	]);
	const [selectedPicture, setSelectedPicture] = useState(0);
	const router = useRouter();
	const roomsFetch = useRooms(hotel.Id, router.query);
	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel");
	const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
		useLocalStorage("chosenRooms", []);
	const goToSearch = (data: any) => {
		router.push(
			{
				pathname: "/hotels/[slug]",
				query: { slug: router.query.slug, ...data },
			},
			undefined,
			{ shallow: true }
		);
		roomsFetch.mutate(roomsFetch.data);
	};

	const [total, setTotal] = useState(0);

	const selectRoom = () => {
		let totalPrice = 0;
		roomsFetch.data.forEach((item: any) => {
			item.Data.forEach((room: any) => {
				if (room.Quantity) {
					totalPrice = totalPrice + room.Quantity * room.PriceToPay;
				}
			});
		});
		setTotal(totalPrice);
	};
	const getChosenRooms = () => {
		let selectedRooms: any = [];
		roomsFetch.data.forEach((item: any) => {
			item.Data.forEach((room: any) => {
				if (room.Quantity > 0) {
					selectedRooms.push(room);
				}
			});
		});
		return selectedRooms;
	};

	const reservation = () => {
		if (total > 0) {
			let chosenRoomsList = getChosenRooms();
			setChosenRoomsStorage(chosenRoomsList);
			setSelectedHotelStorage(hotel);
			router.push({
				pathname: "/hotels/booking",
			});
		}
	};

	return (
		<>
			<HeadSeo
				title={i18n.language === "ar" ? hotel?.NameAr : hotel?.Name}
				description={t("home:mada")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="bg-primary-tint pt-16 lg:pt-40 ">
					<section className="flex justify-start ">
						<div className="w-full pt-12 pb-36 container mx-auto flex flex-col gap-6 px-6 lg:px-10">
							<div className="fixed w-full bg-white z-30 bottom-0 rtl:right-0 ltr:left-0 p-4 lg:hidden flex justify-between shadow-t-md">
								<div className="text-primary-shade flex gap-1 items-end font-bold text-3xl ">
									<div className="text-secondary font-bold text-2xl">
										{total.toFixed(2)}
									</div>
									<span className="text-sm text-primary">
										{t("common:sar")}
									</span>
								</div>

								<button
									className="btn btn-primary py-2 w-[150px] text-base"
									onClick={() => reservation()}>
									{t("button:book")}
								</button>
							</div>

							<Link
								passHref
								href={{ pathname: "/search", query: router.query }}>
								<div className="text-primary text-sm flex justify-start items-center gap-4 cursor-pointer">
									<i className="icon-angle-small-left-1 rtl:rotate-180 text-xs"></i>
									<div>{t("search:back-to-hotels-list")}</div>
								</div>
							</Link>
							{/* Start Card for Hotel info */}
							<div className="p-6 flex items-start lg:items-end lg:justify-between gap-5 md:gap-7 -mx-6 sm:mx-0 relative bg-secondary">
								<div className="flex flex-col gap-1 lg:gap-3">
									<div className="flex flex-col lg:items-center gap-1 lg:flex-row lg:gap-4">
										<h1 className="text-white font-bold text-xl lg:text-3xl ">
											{i18n.language === "ar" ? hotel?.NameAr : hotel?.Name}
										</h1>

										<div className="flex justify-start items-center">
											{[1, 2, 3, 4, 5].map((value, index) => {
												return (
													<i
														key={index}
														className={`icon-star_black_24dp text-xl ${
															value <= hotel?.Stars
																? "text-white"
																: "text-secondary"
														}`}></i>
												);
											})}
										</div>
									</div>
									<div className="flex items-center gap-1">
										<i className="icon-marker-1 text-sm text-white"></i>
										<h3 className="text-white text-xs">
											{i18n.language === "ar"
												? hotel?.AdressAr ?? hotel?.Adress
												: hotel?.Adress}
										</h3>
									</div>
								</div>
								<div className="hidden lg:block">
									<a
										href="#list-offers"
										className="btn text-secondary bg-primary-tint py-3 px-6 border-none">
										{t("button:show-rooms")}
									</a>
								</div>
							</div>

							{/* End Card for Hotel info */}

							{/* Start Hotel images + map */}

							<div className="hidden lg:grid grid-cols-3 grid-rows-5 -mt-6 relative">
								<div className="relative col-span-2 row-span-5">
									<Image
										alt="hotel"
										src={
											hotel?.Pictures[selectedPicture]?.secure_url ??
											"/images/no-hotel.jpg"
										}
										layout="responsive"
										width={360}
										height={220}
										objectFit="cover"></Image>
								</div>
								<div className="flex justify-start items-center absolute bottom-6 gap-6 rtl:right-8 ltr:left-8">
									<div
										onClick={() => {
											if (selectedPicture > 0) {
												setSelectedPicture(selectedPicture - 1);
											}
										}}
										className="border border-solid border-white flex justify-center bg-dark/30 items-center p-4 h-10 w-10 rounded-full">
										<i className="icon-angle-small-left-1 text-white rtl:rotate-180"></i>
									</div>
									<div
										onClick={() => {
											if (selectedPicture < hotel?.pictures.length - 1) {
												setSelectedPicture(selectedPicture + 1);
											}
										}}
										className="border border-solid border-white flex justify-center bg-dark/30 items-center p-4 h-10 w-10 rounded-full">
										<i className="icon-angle-small-left-1 text-white ltr:rotate-180"></i>
									</div>
								</div>
								{/* {hotel?.Pictures.slice(2, 6).map((img: any, idx: number) => (
										<div key={idx} className="relative col-span-1 row-span-5">
											<Image
												alt="hotel"
												src={img?.secure_url ?? "/images/no-hotel.jpg"}
												layout="responsive"
												width={360}
												height={220}
												objectFit="cover"></Image>
										</div>
									))} */}

								<div className="relative col-span-1 row-span-5">
									<iframe
										className="w-full h-full"
										src={`https://map.google.com/maps?api=1&q=${
											JSON.parse(hotel.MapInfo).geometry.location.lat
										},${
											JSON.parse(hotel.MapInfo).geometry.location.lng
										}&hl=es;z=24&amp&output=embed`}
										loading="lazy"></iframe>
								</div>
							</div>
							{/* End Hotel images + map */}

							{/* Start Hotel description  */}
							<div className="block lg:hidden -mt-6">
								<div className="flex snap-mandatory snap-x overflow-x-auto -mx-6 sm:mx-0">
									{hotel?.Pictures.map((img: any, idx: number) => (
										<div
											key={idx}
											className="relative h-56 sm:h-80 min-w-full snap-center">
											<Image
												alt="hotel"
												src={img?.secure_url ?? "/images/no-hotel.jpg"}
												layout="fill"
												objectFit="fill"
											/>
										</div>
									))}
								</div>

								<div className="h-64 min-w-full -mx-6 sm:mx-0">
									<iframe
										className="w-full h-full"
										src={`https://map.google.com/maps?api=1&q=${
											JSON.parse(hotel.MapInfo).geometry.location.lat
										},${
											JSON.parse(hotel.MapInfo).geometry.location.lng
										}&hl=es;z=24&amp&output=embed`}
										loading="lazy"></iframe>
								</div>
							</div>
							<div className="flex flex-col gap-8">
								<div className="relative pb-2">
									<h1 className="text-primary text-3xl font-bold font-ruqaa">
										{t("hotel:about-hotel")}
									</h1>
								</div>
								{!hotel?.DescriptionAr && !hotel.Description ? (
									<p className="text-dark text-sm ">
										{t("hotel:no-description")}
									</p>
								) : (
									<p
										dangerouslySetInnerHTML={{
											__html:
												i18n.language === "ar"
													? hotel?.DescriptionAr
													: hotel?.Description,
										}}
										className="text-dark text-sm"></p>
								)}
							</div>
							{/* End Hotel description  */}

							{/* Start Card for update date and promocode */}

							<HotelSearch goToSearch={goToSearch} />

							{/* End Card for update date and promocode */}

							{/* Start Room Cards For Mobile*/}
							{roomsFetch.data?.length > 0 ? (
								<div className="flex flex-col gap-6 lg:hidden ">
									{roomsFetch.data?.map((room: any, idx: number) => (
										<div key={idx}>
											<HotelRoomCard onSelectRoom={selectRoom} room={room} />
										</div>
									))}
								</div>
							) : (
								<div className="flex flex-col gap-6 lg:hidden ">
									{t("hotel:no-rooms")}
								</div>
							)}

							{/* End Room Cards For Mobile*/}

							{/* Start Room Cards Table For Desktop*/}
							{roomsFetch.isLoading ? (
								<div className="space-y-4 w-full flex flex-col gap-6">
									{[1, 2, 3, 4, 5].map((i) => (
										<LoadingCard key={i} />
									))}
								</div>
							) : roomsFetch.data?.length > 0 ? (
								<div
									id="list-offers"
									className="hidden lg:block p-4 scroll-m-20">
									<RoomCardsTable hotel={hotel} rooms={roomsFetch.data} />
								</div>
							) : (
								<div className="hidden lg:block p-4 shadow-t-md">
									{t("hotel:no-rooms")}
								</div>
							)}
							{/* End Room Cards Table For Desktop*/}

							{/* Start Facilities */}
							<div className="px-4 py-8 flex flex-col gap-8">
								<h1 className="text-secondary font-ruqaa text-4xl font-bold">
									{t("hotel:facilities")}
								</h1>

								<div className="flex flex-col gap-4">
									<div>
										<h2 className="font-bold text-primary text-2xl mb-2">
											{t("hotel:facility")}
										</h2>
										<ul className="grid grid-cols-2 lg:grid-cols-4">
											{hotel.Facilities.slice(0, 4).map(
												(item: any, idx: number) => (
													<li key={idx} className="flex items-center gap-2">
														<i className="icon-Rectangle-9794 text-secondary text-[0.5rem]"></i>
														<div className="text-dark">
															{i18n.language === "ar" ? item.NameAr : item.Name}
														</div>
													</li>
												)
											)}

											<Disclosure>
												{({ open }) => (
													<>
														<div className="flex flex-col col-span-2 lg:col-span-4">
															<Transition
																enter="transition duration-100 ease-out"
																enterFrom="transform scale-95 opacity-0"
																enterTo="transform scale-100 opacity-100"
																leave="transition duration-75 ease-out"
																leaveFrom="transform scale-100 opacity-100"
																leaveTo="transform scale-95 opacity-0">
																<Disclosure.Panel className="grid grid-cols-2 lg:grid-cols-4">
																	{hotel.Facilities.map(
																		(item: any, idx: number) => (
																			<li
																				key={idx}
																				className="flex items-center gap-2">
																				<i className="icon-Rectangle-9794 text-secondary text-[0.5rem]"></i>
																				<div className="text-dark">
																					{i18n.language === "ar"
																						? item.NameAr
																						: item.Name}
																				</div>
																			</li>
																		)
																	)}
																</Disclosure.Panel>
															</Transition>

															<Disclosure.Button className="flex justify-start items-center gap-2">
																<i
																	className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
																		open ? "rotate-180" : "rotate-0"
																	}`}></i>
															</Disclosure.Button>
														</div>
													</>
												)}
											</Disclosure>
										</ul>
									</div>
								</div>
							</div>
							{/* End Facilities */}
						</div>
					</section>
				</div>
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const queries = context.query;
	const resHotel = await fetch(
		`${process.env.NEXT_PUBLIC_API}/hotels/getHotelBySlug?slug=${
			context.params!.slug
		}`
	);

	const hotel = await resHotel.json();

	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "search", "hotel"],
				nextI18NextConfig
			)),
			hotel,
		},
	};
};
export default Details;
