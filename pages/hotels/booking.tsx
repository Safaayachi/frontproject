import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";
import HeadSeo from "../../components/HeadSeo";
import Layout from "../../components/layout";
import ModalError from "../../components/ModalError";
import StartsBox from "../../components/starts-box";
import siteMetadata from "../../data/siteMetadata";
import nextI18NextConfig from "../../i18n/next-i18next.config";

const Booking: NextPage = () => {
	const router = useRouter();
	const { t, i18n } = useTranslation([
		"common",
		"search",
		"button",
		"validation",
		"booking",
	]);
	const [chosenRoomsStorage, setChosenRoomsStorage, removeChosenRoomsStorage] =
		useLocalStorage("chosenRooms", []);
	const [guestInfo, setGuestInfo, removeGuestInfo] = useLocalStorage(
		"guestInfo",
		{}
	);

	const [
		selectedHotelStorage,
		setSelectedHotelStorage,
		removeSelectedHotelStorage,
	] = useLocalStorage("selectedHotel", {
		NameAr: "",
		Name: "",
		Stars: 5,
		AdressAr: "",
		Adress: "",
		DefaultPicture: "",
		Id: "",
	});
	const [showModal, setShowModal] = useState(false);
	const closeErrorModal = () => {
		setShowModal(false);
	};

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

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});

	const onSubmit = (data: any) => {
		if (isValid) {
			setGuestInfo(data);
			router.push({
				pathname: "/hotels/booking-paiement",
			});
		} else {
			setShowModal(true);
		}
	};

	const goBack = () => {
		router.back();
	};

	return (
		<>
			<HeadSeo
				title={
					i18n.language === "ar"
						? selectedHotelStorage!.NameAr
						: selectedHotelStorage!.Name
				}
				description={t("home:tawaf")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="pt-16 lg:pt-40">
					<section className="flex flex-col gap-4 container mx-auto px-6 lg:px-10 ">
						<div className="w-full pt-8 relative flex flex-col-reverse lg:flex-row justify-between gap-0.5">
							{/* Start Booking Card */}
							<div className="flex flex-col bg-secondary w-full lg:w-2/3 h-fit overflow-hidden ">
								<div className="relative h-80 md:min-h-full w-full">
									<Image
										alt="hotel"
										src={
											selectedHotelStorage?.DefaultPicture ??
											"/images/no-hotel.jpg"
										}
										layout="fill"
										objectFit="cover"></Image>
								</div>

								<div className="w-full flex flex-col ">
									<div className=" w-full p-4 text-white">
										<div className="border-b border-solid border-dark-tint px-4 space-y-4">
											<div className="flex justify-start md:items-center mb-2 gap-2 md:gap-4 items-start flex-col md:flex-row">
												<h2 className="font-bold text-xl line-clamp-1 md:text-2xl">
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
													<div key={idx} className="flex flex-col">
														<h2 className=" font-bold text-sm mt-4">
															{room.Quantity} x{" "}
															{i18n.language === "ar"
																? room.RoomTypeNameAr
																: room.RoomTypeName}
														</h2>
														<div className="flex gap-2 py-4 last:border-0 border-b border-solid border-dark-tint ">
															<div className="flex items-center gap-2">
																<i className="icon-restaurant text-white"></i>
																<h2 className="text-sm font-semibold ">
																	{i18n.language === "ar"
																		? room.MealAr
																		: room.Meal}
																</h2>
															</div>
															<div className="flex items-center gap-2">
																<i className="icon-blinds-raised text-white"></i>
																<h2 className="text-sm font-semibold ">
																	{i18n.language === "ar"
																		? room.ViewNameAr
																		: room.ViewName}
																</h2>
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
										<h2 className="text-xl font-bold">{t("common:sum")}</h2>
										<div className="font-bold text-4xl">
											{totalPrice.toFixed(2)}
											<span className="">{t("common:sar")}</span>
										</div>
									</div>
								</div>
							</div>

							{/* End Booking Info */}
						</div>
						{/* start guest information */}
						<div className="flex flex-row gap-0.5">
							<form
								className="w-full lg:w-2/3"
								onSubmit={handleSubmit(onSubmit)}>
								<div className="px-4 py-8 flex flex-col gap-8 bg-white w-full mb-4">
									<h1 className=" text-4xl font-ruqaa font-bold text-secondary">
										{t("booking:guest-data")}
									</h1>

									<div className="grid grid-cols-2 gap-4">
										<label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
											<input
												type="text"
												id="FirstName"
												placeholder={t("input:first-name")}
												{...register("FirstName", {
													required: true,
												})}
											/>
											{errors.FirstName?.type === "required" && (
												<div className="text-danger">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</label>
										<label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
											<input
												type="text"
												id="LastName"
												placeholder={t("input:last-name")}
												{...register("LastName", {
													required: true,
												})}
											/>
											{errors.LastName?.type === "required" && (
												<div className="text-danger">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</label>
										<label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
											<input
												type="email"
												id="Email"
												placeholder={t("input:email")}
												{...register("Email", {
													required: true,
													pattern:
														/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
												})}
											/>
											{errors.Email?.type === "required" && (
												<div className="text-danger">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</label>
										<label className="flex flex-col gap-4 col-span-2 lg:col-span-1">
											<input
												className="text-start"
												dir="ltr"
												type="text"
												placeholder={t("input:phone-number")}
												id="Phone"
												{...register("Phone", {
													required: true,
													pattern:
														/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/,
												})}
											/>
											{errors.Phone && (
												<div className="text-danger">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</label>
									</div>
								</div>
								<div className="px-4 py-8 flex flex-col gap-4 bg-white w-full ">
									<h1 className="text-4xl font-ruqaa font-bold text-secondary">
										{t("booking:special-demands")} ({t("common:facultative")})
									</h1>

									<div className="grid grid-cols-2 gap-4">
										<label className="flex flex-col gap-4 col-span-2 ">
											<textarea
												placeholder={t("input:please-write-demands-in-english")}
												className="h-36 rounded-3xl"
												name="Comment"
												id="Comment"
												{...(register("Comment"),
												{ required: false, minLength: 6 })}
											/>
										</label>

										<p className="text-xs text-danger font-bold col-span-2">
											{t("booking:special-demands-warning")}
										</p>
										<div className="flex flex-col gap-5 lg:flex-row lg:justify-between col-span-2">
											<button
												className="btn whitespace-nowrap text-primary border-primary border-solid border bg-primary/20 text-xl lg:w-52"
												onClick={() => goBack()}>
												{t("button:review-order")}
											</button>
											<button
												type="submit"
												className="btn btn-primary text-xl lg:w-52">
												{t("button:go-to-pay")}
											</button>
										</div>
									</div>
								</div>
							</form>
							<div className="hidden lg:block lg:w-1/3"></div>
						</div>
						{/* end guest information */}
					</section>
				</div>
				{showModal && (
					<ModalError
						text={t("validation:fill-all-fields")}
						onClose={closeErrorModal}
					/>
				)}
			</Layout>
		</>
	);
};
export const getServerSideProps: GetServerSideProps = async (context) => {
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
export default Booking;
