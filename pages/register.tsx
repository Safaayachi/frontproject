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
	FirstName: string;
	LastName: string;
};
const Register: NextPage<{}> = () => {
	const { t } = useTranslation([
		"common",
		"home",
		"button",
		"validation",
		"auth",
	]);
	const router = useRouter();
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
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
					`${process.env.NEXT_PUBLIC_API}/account/register`,
					options
				);
				const data = await res.json();
				if (data.success) {
					router.push("/auth/login");
				}
			} catch (err) {}
		}
	};
	return (
		<>
			<HeadSeo
				title={t("auth:register")}
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
										{t("auth:register-in-sadana")}
									</h1>
								</div>
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									<div className="space-y-4">
										<div className="flex w-full  mb-2 gap-4">
											<div className="w-1/2">
												<div className="flex text-start">
													<label
														htmlFor="FirstName"
														className="block mb-2 text-sm text-dark font-semibold">
														{t("input:first-name")}*
													</label>
												</div>
												<input
													type="text"
													id="FirstName"
													placeholder={t("input:first-name")}
													{...register("FirstName", {
														required: true,
														pattern: /^[A-Za-z]+$/i,
													})}
												/>
												{errors.FirstName && (
													<div className="text-danger text-xxs">
														{t("validation:fill-all-fields")}
													</div>
												)}
											</div>
											<div className="w-1/2">
												<div className="flex text-start">
													<label
														htmlFor="LastName"
														className="block mb-2 text-sm text-dark font-semibold">
														{t("input:last-name")}*
													</label>
												</div>
												<input
													type="LastName"
													id="LastName"
													placeholder={t("input:last-name")}
													{...register("LastName", {
														required: true,
														pattern: /^[A-Za-z]+$/i,
													})}
												/>
												{errors.LastName && (
													<div className="text-danger text-xxs">
														{t("validation:fill-all-fields")}
													</div>
												)}
											</div>
										</div>
										<div>
											<div className="flex text-start mb-2">
												<label
													htmlFor="email"
													className="block mb-2 text-sm text-dark font-semibold">
													{t("input:email")}*
												</label>
											</div>
											<input
												type="email"
												id="email"
												placeholder={t("input:email")}
												{...register("UserName", {
													required: true,
													pattern:
														/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
													{t("input:password")}*
												</label>
											</div>
											<div className="relative">
												<input
													type={`${isPasswordHidden ? "password" : "text"}`}
													id="password"
													placeholder={t("input:password")}
													{...register("Password", {
														required: true,
													})}
												/>
												<i
													onClick={() => setIsPasswordHidden(!isPasswordHidden)}
													className={`${
														isPasswordHidden ? "icon-eye-crossed" : "icon-eye"
													} absolute rtl:left-4 ltr:right-4 top-[calc(50%-8px)] text-dark-tint`}></i>
											</div>
											{errors.Password && (
												<div className="text-danger text-xxs">
													{t("validation:fill-all-fields")}
												</div>
											)}
										</div>
										<label
											className="flex gap-1 items-center text-xxs my-8"
											htmlFor="notify-me">
											<input
												id="notify-me"
												type="checkbox"
												className="form-checkbox rounded text-primary"
											/>
											<div>{t("input:notify-me-with-deals")}</div>
										</label>
									</div>
									<div className="space-y-2">
										<div>
											<button
												type="button"
												className="btn btn-secondary font-ruqaa text-xl">
												{t("button:register")}
											</button>
										</div>
										<p className="flex gap-2 justify-center items-center ">
											<div className="text-secondary font-bold">
												{t("auth:already-member")}
											</div>
											<Link href="/register" passHref>
												<div className="hover:underline text-primary font-bold cursor-pointer">
													{t("auth:login")}
												</div>
											</Link>
										</p>
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

export default Register;
