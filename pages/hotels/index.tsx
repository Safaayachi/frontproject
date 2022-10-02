import { GetStaticProps, NextPage, GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/layout";
import StartsBox from "../../components/starts-box";
import nextI18NextConfig from "../../i18n/next-i18next.config";
import Pagination from "../../components/pagination";
import LoadingCard from "../../components/LoadingCard";
import { useMemo, useState } from "react";
import Link from "next/link";
import format from "date-fns/format";
import { addDays } from "date-fns";
import HeadSeo from "../../components/HeadSeo";
import siteMetadata from "../../data/siteMetadata";
import { useHotels } from "../../hooks/useHotels";

const Hotels: NextPage<{ hotels: any }> = ({ hotels }) => {
	const { t } = useTranslation(["common", "search", "button"]);
	const [currentPage, setCurrentPage] = useState(1);
	const { data, size, isLoading, setSize } = useHotels();
	const handleChange = (page: any) => {
		setCurrentPage(page);
		setSize(page);
	};
	return (
		<>
			<HeadSeo
				title={t("common:hotels-title")}
				description={t("home:my-hotels")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="bg-primary-tint pt-16 lg:pt-40 ">
					<section className="relative py-20">
						<div className="container px-6 md:px-24 sm:mx-auto relative z-10">
							<h1 className="text-secondary font-bold text-5xl font-ruqaa lg:text-[50px] lg:mb-10 mb-2">
								{t("home:hotels")}
							</h1>

							{isLoading && (
								<div className="space-y-4 w-full flex flex-col gap-6">
									{[1, 2, 3, 4, 5].map((i) => (
										<LoadingCard key={i} />
									))}
								</div>
							)}
							<div className=" grid justify-center gap-6 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
								{data &&
									data?.length > 0 &&
									data[size - 1] &&
									data[size - 1].Data.map((hotel: any, idx: number) => (
										<div key={idx} className="cursor-pointer">
											<Link
												passHref
												href={{
													pathname: `/hotels/[slug]`,
													query: {
														slug: hotel.Slug,
														city: 0,
														checkin: format(
															addDays(new Date(), 0),
															"yyyy-MM-dd"
														),
														checkout: format(
															addDays(new Date(), 1),
															"yyyy-MM-dd"
														),
													},
												}}>
												<div
													key={idx}
													className="h-[350px] w-full bg-white">
													<div className="relative h-60">
														<Image
															alt="hotel"
															src={
																hotel?.DefaultPicture ?? "/images/no-hotel.jpg"
															}
															layout="fill"
															objectFit="cover"></Image>
													</div>
													<div className="p-4 flex flex-col">
														<h2 className="font-bold  w-52">
															{hotel.NameAr ?? hotel.Name}
														</h2>
														<StartsBox rating={hotel.Stars} />
														<p className="text-xs text-dark ">
															{hotel.AdressAr ?? hotel.Adress}
														</p>
													</div>
												</div>
											</Link>
										</div>
									))}
							</div>
							{data && data?.length > 0 && data[size - 1] && (
								<Pagination
									className="pagination-bar"
									currentPage={currentPage}
									totalCount={data[size - 1].TotalCount}
									pageSize={12}
									onPageChange={(page: number) => handleChange(page)}
								/>
							)}
						</div>
					</section>
				</div>
			</Layout>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			...(await serverSideTranslations(
				context.locale as string,
				["common", "button", "home", "input"],
				nextI18NextConfig
			)),
		},
	};
};
export default Hotels;
