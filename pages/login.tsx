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
	Password: string;
};
const Login: NextPage<{}> = () => {
	const { t } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
		"auth",
	]);
	const [user, setUser, removeUser] = useLocalStorage("user");
	const [token, setToken, removeToken] = useLocalStorage("token", "" || null);
	const router = useRouter();
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
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API}/account/Login`,
					options
				);
				const data = await res.json();
				if (data.success) {
					setUser(data.user);
					setToken(data.token);
					if (router.query && router.query.from) {
						router.push({ pathname: "/hotels/booking-paiement/" });
					} else {
						router.push({ pathname: "/" });
					}
				}
			} catch (err) {}
		}
	};
	return (
		<>
			<HeadSeo
				title={t("auth:login")}
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
										{t("auth:login-with-your-email")}
									</h1>
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
										<div>
											<div className="flex text-start mb-2">
												<label
													htmlFor="password"
													className="text-sm text-dark font-semibold">
													{t("input:password")}
												</label>
											</div>
											<input
												type="password"
												id="password"
												placeholder={t("input:password")}
												{...register("Password", {
													required: true,
												})}
											/>
											{errors.Password && (
												<div className="text-danger text-xxs">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</div>
										<div className="text-start">
											<Link href="/forgot" passHref>
												<div className="text-xs hover:underline text-danger text-start font-bold cursor-pointer">
													{t("auth:did-you-forgot-password")}
												</div>
											</Link>
										</div>
									</div>
									<div className="space-y-2">
										<button
											type="button"
											className="btn btn-secondary font-ruqaa text-xl mb-8">
											{t("button:login")}
										</button>

										<p className="flex gap-2 justify-center items-center ">
											<div className="text-secondary font-bold">
												{t("auth:dont-have-account")}
											</div>
											<Link href="/register" passHref>
												<div className="hover:underline text-primary font-bold">
													{t("auth:register")}
												</div>
											</Link>
										</p>
									</div>

									<p className="flex items-center justify-center mx-auto w-3/4 my-4">
										{t("auth:using-social-media")}
									</p>

									<div className="space-y-2">
										<div className="flex justify-center items-center gap-4">
											<button type="button" className="btn bg-[#1977f2] w-40">
												<span className="icon-vuesax-bold-facebook text-xl text-white"></span>
											</button>
											<button type="button" className="btn bg-[#e84434] w-40">
												<span className="icon-vuesax-bold-google text-xl text-white"></span>
											</button>
										</div>
									</div>
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

export default Login;
