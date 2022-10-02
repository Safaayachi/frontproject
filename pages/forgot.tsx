import Link from "next/link";
import Image from "next/image";
import LangDrop from "../components/lang-drop";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../i18n/next-i18next.config.js";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocalStorage } from "react-use";
import siteMetadata from "../data/siteMetadata";
import HeadSeo from "../components/HeadSeo";
type Inputs = {
	UserName: string;
};
const Forgot: NextPage<{}> = () => {
	const { t } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
		"auth",
	]);
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm<Inputs>({
		reValidateMode: "onChange",
		mode: "all",
	});

	const onSubmit: SubmitHandler<Inputs> = async (formData) => {
		if (isValid) {
			const options = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			};
			// try {
			// 	const res = await fetch(
			// 		`${process.env.NEXT_PUBLIC_API}/account/Login`,
			// 		options
			// 	);
			// 	const data = await res.json();
			// 	if (data.success) {
			// 		setUser(data.user);
			// 		setToken(data.token);
			// 		if (router.query && router.query.from) {
			// 			router.push({ pathname: "/hotels/booking-paiement/" });
			// 		} else {
			// 			router.push({ pathname: "/" });
			// 		}
			// 	}
			// } catch (err) {}
		}
	};
	return (
		<>
			<HeadSeo
				title={t("auth:did-you-forgot-password")}
				description={t("home:sadana")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout hasFooter={false} hasHeader={false}>
				<div className="flex min-h-screen">
					<div className="lg:w-1/2 w-full shadow-t-md container px-6 mx-auto lg:px-10">
						<div className="flex flex-col w-full h-full bg-white">
							<header className="bg-white border-b border-solid border-dark-tint py-3">
								<div className="container flex items-center justify-between h-16 mx-auto">
									<Link passHref href={"/"}>
										<div className={`relative cursor-pointer`}>
											<Image
												alt={"sadana-logo"}
												src={"/images/Group 54567.svg"}
												width={118}
												height={50}></Image>
										</div>
									</Link>
									<div className="w-fit">
										<LangDrop />
									</div>
								</div>
							</header>
							<div className="flex flex-col rounded-md pt-6 md:px-8 bg-white mx-auto">
								<div className="mb-8 text-center">
									<h1 className="text-4xl font-bold text-secondary">
										{t("auth:did-you-forgot-password")}
									</h1>
									<h2 className="text-dark-tint text-lg">
										{t("auth:no-problem-just-type-email")}
									</h2>
								</div>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									<div className="space-y-4">
										<div>
											<div className="flex text-start mb-2">
												<label
													htmlFor="email"
													className="block mb-2 text-sm text-dark font-semibold">
													{t("input:email")}
												</label>
											</div>
											<input
												type="email"
												id="email"
												placeholder={t("input:email")}
												{...register("UserName", {
													required: true,
												})}
											/>
											{errors.UserName && (
												<div className="text-danger text-xxs">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</div>
									</div>

									<button
										type="button"
										className="btn btn-secondary font-ruqaa text-xl mb-8">
										{t("button:send-link")}
									</button>
								</form>
							</div>

							<footer className="bg-white border-t mt-auto">
								<div
									className="container flex justify-center py-2 mx-auto text-dark-tint text-xxs border-t-2 border-dark-tint border-solid"
									dir="ltr">
									&copy; {new Date().getFullYear()} Sadana
								</div>
							</footer>
						</div>
					</div>
					<div className="bg-primary-tint min-h-screen h-full hidden lg:block w-1/2">
						<div className="relative min-h-screen h-full w-full ">
							<Image
								alt="mekka"
								src={"/images/Group 54561.svg"}
								layout="fill"></Image>
						</div>
					</div>
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
				["common", "button", "home", "input", "validation", "auth"],
				nextI18NextConfig
			)),
		},
	};
};

export default Forgot;
