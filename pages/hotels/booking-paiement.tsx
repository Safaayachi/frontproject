import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import HeadSeo from "../../components/HeadSeo";
import Layout from "../../components/layout";
import ModalError from "../../components/ModalError";
import siteMetadata from "../../data/siteMetadata";
import nextI18NextConfig from "../../i18n/next-i18next.config";

type Props = {
	banks: any;
};

const BookingPaiement: NextPage<{ banks: any }> = ({ banks }: Props) => {
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
		{
			FirstName: "",
			LastName: "",
		}
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
		Id: 0,
	});

	const [showModal, setShowModal] = useState(false);

	const router = useRouter();
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

	const [bankId, setBankId] = useState("0");

	const onChangeBank = (e: React.FormEvent<HTMLInputElement>) => {
		setBankId(e.currentTarget.value);
	};

	const confirmPaiement = async () => {
		let booking = {
			HotelId: selectedHotelStorage?.Id,
			Bookings: chosenRoomsStorage,
			User: {
				...guestInfo,
				GuestName: guestInfo?.FirstName + " " + guestInfo?.LastName,
				ClientPaymentType: "2",
				BankAccountId: bankId,
			},
		};

		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(booking),
		};
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API}/booking/book_multi_rooms`,
				options
			);
			const data = await res;
			if (data.ok) {
				router.push("/hotels/booking-success");
			}
		} catch (err) {}
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
					<div className="container sm:mx-auto px-6 lg:px-10 ">
						<div className="w-full pt-16 pb-36 gap-0.5 flex flex-col lg:flex-row">
							{/* Start Booking Info */}
							<div className="p-8 bg-secondary w-full lg:w-1/3 md:h-fit text-white relative lg:order-2 ">
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

							{/* start guest information */}
							<div className="p-4 flex flex-col gap-4 bg-white w-full lg:w-2/3 lg:order-1">
								<h1 className="text-secondary font-bold text-4xl font-ruqaa">
									{t("booking:bank-transfer")}
								</h1>

								<form className="flex flex-col gap-4 rtl:pl-7 ltr:pr-7 rtl:mb-7 lg:mb-12">
									<h1 className="text-dark-tint font-semibold mb-4">
										{t("booking:choose-bank-we-send-details")}
									</h1>
									<div className="divide-y divide-dark-tint divide-solid">
										{banks.map((bank: any, idx: number) => (
											<label
												key={idx}
												className="flex items-center justify-start cursor-pointer gap-2 py-3">
												<input
													type="checkbox"
													className="form-radio outline-none text-secondary ring-0 ring-offset-0 rounded-full checked:ring-secondary ring-primary h-4 w-4"
													value={bank.Id}
													name={"banks"}
													onChange={(e) => onChangeBank(e)}
													checked={bankId == bank.Id}
												/>
												<span className="text-sm font-bold text-dark ">
													{i18n.language === "ar"
														? bank.AccountNameAr
														: bank.AccountName}{" "}
													-{" "}
													{i18n.language === "ar"
														? bank.BankNameAr
														: bank.BankName}
												</span>
											</label>
										))}
									</div>
								</form>

								<div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
									<button
										className="btn whitespace-nowrap text-primary border-primary border-solid border bg-primary/20 text-xl lg:w-52"
										onClick={() => goBack()}>
										{t("button:review-order")}
									</button>
									<button
										className="btn btn-primary text-xl lg:w-52"
										onClick={() => confirmPaiement()}>
										{t("button:next")}
									</button>
								</div>
							</div>
							{/* end guest information */}
						</div>
					</div>
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
	const resBank = await fetch(
		`${process.env.NEXT_PUBLIC_API}/booking/bankAccounts`
	);
	const banks = await resBank.json();

	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation", "booking"],
				nextI18NextConfig
			)),
			banks,
		},
	};
};
export default BookingPaiement;
