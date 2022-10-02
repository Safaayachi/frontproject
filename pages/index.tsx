import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/layout";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import HotelSearch from "../components/hotels-search";
import Image from "next/image";
import HeadSeo from "../components/HeadSeo";
import siteMetadata from "../data/siteMetadata";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import StartsBox from "../components/starts-box";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { useLocalStorage } from "react-use";
const Home: NextPage<{ availableHotels: any[] }> = ({ availableHotels }) => {
	const { t, i18n } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
	]);
	const router = useRouter();
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});
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
	] = useLocalStorage("selectedHotel", {});
	const handleGoToSearch = (data: any) => {
		router.push({
			pathname: "/search",
			query: data,
		});
		removeChosenRoomsStorage();
		removeGuestInfo();
		removeSelectedHotelStorage();
	};

	return (
		<>
			<HeadSeo
				title={t("home:sadana")}
				description={t("home:sadana")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<section className="relative w-full pt-20 lg:pt-32">
					<div className="hidden lg:block absolute -z-10 top-20 lg:top-32 w-full h-[60rem] lg:h-[45rem] 2xl:h-[50rem]">
						<div className="relative h-full w-full">
							<Image
								alt="sadana-mekka"
								src="/images/Group 54565.svg"
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
					<div className="block lg:hidden absolute -z-10 top-20 lg:top-32 w-full h-[60rem] lg:h-[45rem] ">
						<div className="relative h-full w-full">
							<Image
								alt="sadana-mekka"
								src="/images/Group 54575.svg"
								layout="fill"
								objectFit="cover"></Image>
						</div>
					</div>
					<div className="container px-6 sm:mx-auto pt-[33rem] 2xl:pt-[35rem] pb-28 md:px-10 h-full">
						<HotelSearch goToSearch={handleGoToSearch} />
					</div>
				</section>
				<section className="bg-primary-tint">
					<div className="container grid grid-cols-2 p-6 mx-auto sm:py-10">
						<div className="relative w-full col-span-2 lg:col-span-1 p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96">
							<Image
								src="/images/Mask Group 2.png"
								alt=""
								layout="fill"
								objectFit="contain"
							/>
						</div>
						<div className="col-span-2 lg:col-span-1 p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-start self-center">
							<p className="mt-6 mb-8 text-2xl leading-10 font-bold sm:mb-12 text-secondary">
								{t("home:sadana-description")}
							</p>
						</div>
					</div>
				</section>
				<section className="py-6 md:py-12 lg:py-32 bg-primary-tint">
					<div className="container mx-auto px-6 lg:px-10">
						<div className="flex justify-center items-center lg:justify-between mb-12">
							<h2 className="text-secondary text-5xl font-ruqaa text-center lg:text-start">
								{t("home:recommended-hotels")}
							</h2>
							<Link passHref href={"/hotels"}>
								<div className="btn btn-secondary max-w-[12rem] px-6 justify-between hidden lg:flex cursor-pointer">
									<div> {t("button:show-more")}</div>
									<i className="icon-angle-small-left-1"></i>
								</div>
							</Link>
						</div>
						<div className="md:grid w-full flex gap-4 md:grid-cols-2 overflow-y-auto snap-x">
							{availableHotels.slice(0, 3).map((hotel, idx) => (
								<div
									key={idx}
									className="flex space-x-6 flex-col bg-white snap-mandatory snap-center">
									<div className="relative h-56">
										<Image
											alt="hotel"
											src={hotel?.DefaultPicture ?? "/images/no-hotel.jpg"}
											layout="fill"
											objectFit="cover"></Image>
									</div>
									<div className="flex flex-col p-6 gap-4">
										<h4 className="text-2xl font-semibold text-gray-900">
											{i18n.language === "ar" ? hotel.NameAr : hotel.Name}
										</h4>
										<p className="text-sm flex justify-start items-center gap-2 text-dark-tint truncate">
											<i className="icon-marker-1"></i>
											<span>
												{i18n.language === "ar"
													? hotel.AdressAr ?? hotel.Adress
													: hotel.Adress}
											</span>
										</p>
										<StartsBox rating={hotel.Stars} />

										<Link
											passHref
											href={{
												pathname: `/hotels/[slug]`,
												query: {
													slug: hotel.Slug,
													city: 0,
													checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
													checkout: format(
														addDays(new Date(), 1),
														"yyyy-MM-dd"
													),
												},
											}}>
											<div className="btn btn-secondary max-w-[10rem] self-end cursor-pointer">
												{t("button:more-details")}
											</div>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="bg-secondary relative">
					<div className="w-8 h-8 bg-primary-tint -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45"></div>
					<div className="w-8 h-8 bg-secondary -bottom-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45"></div>
					<div className="flex gap-16 lg:gap-8 flex-col-reverse justify-between items-center lg:flex-row container mx-auto px-6 lg:px-10 py-16">
						<form className="space-y-6">
							<h1 className="text-6xl text-white">
								{t("home:get-recent-deals")}
							</h1>
							<h3 className="text-xl text-white">
								{t("home:want-get-newsletter")}
							</h3>

							<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
								<input id="sub" type="email" placeholder={t("input:email")} />
								<button
									type="submit"
									className="btn btn-primary-outline lg:w-56">
									{t("button:explore-more")}
								</button>
							</div>
						</form>

						<div className="relative h-52 md:h-64 object-contain w-full lg:w-1/2">
							<Image
								src="/images/Email capture-pana.svg"
								alt="email-capture"
								layout="fill"
								objectFit="contain"
							/>
						</div>
					</div>
				</section>
				<section className="py-8 bg-[#f5eee6] text-gray-900">
					<div className="container flex flex-col items-center mx-auto mb-8 md:p-10 md:px-12">
						<h1 className="text-4xl md:text-6xl text-center text-secondary font-ruqaa">
							{t("home:most-visited")}
						</h1>
					</div>

					<div className="container grid grid-cols-1 gap-4 px-6 lg:px-10 sm:mx-auto md:grid-cols-3 ">
						<Link
							passHref
							href={{
								pathname: "/search",
								query: {
									city: 1,
									checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
									checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
								},
							}}>
							<div className="relative flex justify-center col-span-1 md:col-span-2 items-center group z-[5] cursor-pointer">
								<div className="group-hover:brightness-75 transition duration-200 ease-in-out filter w-full h-96 relative">
									<Image
										layout="fill"
										objectFit="cover"
										src="/images/527d3cb6a2addaa7c95670e537c982bb.png"
										alt=""
									/>
								</div>
								<div className="w-8 h-8 bg-primary-tint transition-all duration-200 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:-top-6 rtl:group-hover:left-[calc(50%-24px)] rtl:group-hover:right-[calc(50%-24px)] -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45 z-0"></div>
								<div className="absolute text-4xl font-ruqaa text-white">
									{t("home:makka")}
								</div>
							</div>
						</Link>
						<Link
							passHref
							href={{
								pathname: "/search",
								query: {
									city: 3,
									checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
									checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
								},
							}}>
							<div className="relative flex col-span-1 justify-center items-center group z-[4] cursor-pointer">
								<div className="group-hover:brightness-75 transition duration-200 ease-in-out filter w-full h-96 relative">
									<Image
										layout="fill"
										objectFit="cover"
										alt=""
										src="/images/621301b090d8273d7fc108ba77d79c6d.png"
									/>
								</div>
								<div className="w-8 h-8 bg-primary-tint transition-all duration-200 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:-top-6 rtl:group-hover:left-[calc(50%-24px)] rtl:group-hover:right-[calc(50%-24px)] -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45 z-0"></div>
								<div className="absolute text-4xl font-ruqaa text-white">
									{t("home:medina")}
								</div>
							</div>
						</Link>
						<Link
							passHref
							href={{
								pathname: "/search",
								query: {
									city: 2,
									checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
									checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
								},
							}}>
							<div className="relative flex col-span-1 justify-center items-center group z-[3] cursor-pointer">
								<div className="group-hover:brightness-75 transition duration-200 ease-in-out filter w-full h-96  relative">
									<Image
										layout="fill"
										objectFit="cover"
										alt=""
										src="/images/629b7d6e0ca78ccd33db99cbbcd76af0.png"
									/>
								</div>
								<div className="w-8 h-8 bg-primary-tint transition-all duration-200 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:-top-6 rtl:group-hover:left-[calc(50%-24px)] rtl:group-hover:right-[calc(50%-24px)] -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45 z-0"></div>
								<div className="absolute text-4xl font-ruqaa text-white">
									{t("home:jidah")}
								</div>
							</div>
						</Link>
						<Link
							passHref
							href={{
								pathname: "/search",
								query: {
									city: 0,
									checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
									checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
								},
							}}>
							<div className="relative flex col-span-1 justify-center items-center group z-[2] cursor-pointer">
								<div className="group-hover:brightness-75 transition duration-200 ease-in-out filter w-full h-96  relative">
									<Image
										layout="fill"
										objectFit="cover"
										alt=""
										src="/images/dc8d0529fe30f7d4e254b00b07f61215.png"
									/>
								</div>
								<div className="w-8 h-8 bg-primary-tint transition-all duration-200 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:-top-6 rtl:group-hover:left-[calc(50%-24px)] rtl:group-hover:right-[calc(50%-24px)] -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45 z-0"></div>
								<div className="absolute text-4xl font-ruqaa text-white">
									{t("home:taef")}
								</div>
							</div>
						</Link>
						<Link
							passHref
							href={{
								pathname: "/search",
								query: {
									city: 0,
									checkin: format(addDays(new Date(), 0), "yyyy-MM-dd"),
									checkout: format(addDays(new Date(), 1), "yyyy-MM-dd"),
								},
							}}>
							<div className="relative flex col-span-1 justify-center items-center group z-[1] cursor-pointer">
								<div className="group-hover:brightness-75 transition duration-200 ease-in-out filter w-full h-96  relative">
									<Image
										layout="fill"
										objectFit="cover"
										alt=""
										src="/images/724e40e76735c238f923fa1604a75af3.png"
									/>
								</div>
								<div className="w-8 h-8 bg-primary-tint transition-all duration-200 ease-in-out group-hover:w-12 group-hover:h-12 group-hover:-top-6 rtl:group-hover:left-[calc(50%-24px)] rtl:group-hover:right-[calc(50%-24px)] -top-4 ltr:left-[calc(50%-16px)] rtl:right-[calc(50%-16px)] absolute transform rotate-45 z-0"></div>
								<div className="absolute text-4xl font-ruqaa text-white">
									{t("home:riadh")}
								</div>
							</div>
						</Link>
					</div>
				</section>
				<section className="relative text-white">
					<div className="absolute top-0 w-full h-full">
						<div className="relative w-full min-h-full filter brightness-75">
							<Image
								layout="fill"
								objectFit="cover"
								alt="bg"
								src={"/images/10ab152a4e373450cbcc82502b7b7e5f.png"}></Image>
						</div>
					</div>
					<div className="relative">
						<div className="container flex flex-col items-center px-6 sm:mx-auto lg:px-10">
							<h1 className="p-4 text-4xl lg:text-6xl leading-none text-center text-white font-ruqaa">
								{t("home:clients-review")}
							</h1>
						</div>
						<div className="container flex snap-x snap-mandatory overflow-x-auto lg:overflow-x-hidden lg:snap-none items-center justify-center mx-auto lg:flex-row lg:justify-evenly">
							<div
								className={`flex flex-col max-w-sm mx-4 my-6 shadow-lg min-w-full lg:min-w-0 snap-center scale-100 md:scale-90`}>
								<div className="flex flex-col gap-20 p-8 bg-secondary">
									<p className="text-xl leading-tight ">{t("home:test-2")}</p>
									<div className="flex items-center gap-3">
										<Image
											layout="fixed"
											width={30}
											height={30}
											src="/images/Group 54566.svg"
											alt="person"
										/>
										<p className="text-sm uppercase" dir="ltr">
											Zahid Ishaq
										</p>
									</div>
								</div>
							</div>
							<div
								className={`flex flex-col max-w-sm mx-4 my-6 shadow-lg min-w-full lg:min-w-0 snap-center `}>
								<div className="flex flex-col gap-20 p-8 bg-secondary">
									<p className="text-xl leading-tight ">{t("home:test-3")}</p>
									<div className="flex items-center gap-3">
										<Image
											layout="fixed"
											width={30}
											height={30}
											src="/images/Group 54566.svg"
											alt="person"
										/>
										<p className="text-sm uppercase" dir="ltr">
											Zahid Ishaq
										</p>
									</div>
								</div>
							</div>
							<div
								className={`flex flex-col max-w-sm mx-4 my-6 shadow-lg min-w-full lg:min-w-0 snap-center scale-100 md:scale-90`}>
								<div className="flex flex-col gap-20 p-8 bg-secondary">
									<p className="text-xl leading-tight ">{t("home:test-1")}</p>
									<div className="flex items-center gap-3">
										<Image
											layout="fixed"
											width={30}
											height={30}
											src="/images/Group 54566.svg"
											alt="person"
										/>
										<p className="text-sm uppercase" dir="ltr">
											Zahid Ishaq
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};
export const getStaticProps: GetStaticProps = async (context) => {
	const resAvailableHotels = await fetch(
		`${process.env.NEXT_PUBLIC_API}/Hotels/GetAvailableHotels`
	);

	const availableHotels = await resAvailableHotels.json();
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input", "validation"],
				nextI18NextConfig
			)),
			availableHotels: availableHotels,
		},
	};
};
export default Home;
