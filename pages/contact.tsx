import { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import HeadSeo from "../components/HeadSeo";
import Layout from "../components/layout";
import siteMetadata from "../data/siteMetadata";
import nextI18nextConfig from "../i18n/next-i18next.config";
import Link from "next/link";

const Contact: NextPage = () => {
	const { t } = useTranslation([
		"common",
		"button",
		"home",
		"input",
		"validation",
	]);
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		reValidateMode: "onChange",
		mode: "all",
	});
	return (
		<>
			<HeadSeo
				title={t("common:contact-title")}
				description={t("home:sadana")}
				canonicalUrl={siteMetadata.siteUrl}
				ogTwitterImage={siteMetadata.siteLogoSquare}
				ogType={"website"}
			/>
			<Layout>
				<div className="pt-16 lg:pt-32">
					<section className="relative">
						<div className="relative w-full h-80 filter brightness-50">
							<Image
								layout="fill"
								objectFit="cover"
								alt="bg"
								src={"/images/10ab152a4e373450cbcc82502b7b7e5f.png"}></Image>
						</div>
						<div className="flex flex-col items-center text-center absolute w-full font-ruqaa top-1/2">
							<h1 className="text-7xl sm:text-8xl text-white">
								{t("common:contact-us")}
							</h1>
						</div>
					</section>
					<section className="bg-primary-tint">
						<form className="container mx-auto px-6 lg:px-10 flex flex-col py-7">
							<fieldset className="grid grid-cols-4 gap-6">
								<div className="space-y-2 col-span-full">
									<h1 className="text-3xl text-secondary font-medium">
										{t("common:send-question")}
									</h1>
									<h2 className="text-xs">{t("common:contact-us-text")}</h2>
								</div>
								<div className="grid grid-cols-6 gap-4 col-span-full">
									<div className="col-span-full sm:col-span-3 flex flex-col gap-2">
										<label htmlFor="name" className="text-xs px-4">
											{t("input:name")}
										</label>
										<input
											id="name"
											type="text"
											placeholder={t("input:name")}
										/>
									</div>
									<div className="col-span-full sm:col-span-3 flex flex-col gap-2">
										<label htmlFor="email" className="text-xs px-4">
											{t("input:email")}
										</label>
										<input
											id="email"
											type="email"
											placeholder={t("input:email")}
										/>
									</div>
									<div className="col-span-full sm:col-span-3 flex flex-col gap-2">
										<label htmlFor="phone" className="text-xs px-4">
											{t("input:phone-number")}
										</label>
										<input
											id="phone"
											type="text"
											placeholder={t("input:phone-number")}
										/>
									</div>
									<div className="col-span-full sm:col-span-3 flex flex-col gap-2">
										<label htmlFor="topic" className="text-xs px-4">
											{t("input:topic")}
										</label>
										<input
											id="topic"
											type="text"
											placeholder={t("input:choose-topic")}
										/>
									</div>
									<div className="col-span-full flex flex-col gap-2">
										<label htmlFor="problem" className="text-xs px-4">
											{t("input:problem")}
										</label>
										<textarea
											className=" min-h-[150px] rounded-2xl"
											id="problem"
											placeholder={t("input:write-your-problem")}></textarea>
									</div>
								</div>
							</fieldset>

							<label
								className="flex gap-1 items-center text-xxs my-8"
								htmlFor="i-agree">
								<input
									id="i-agree"
									type="checkbox"
									className="form-checkbox rounded text-primary"
								/>
								<span>
									{t("input:i-agree-on-data-processing")}
									<Link href={"/privacy-policy"} passHref>
										<span className="underline text-secondary hover:text-secondary-shade">
											{t("common:privacy-policy")}
										</span>
									</Link>
								</span>
							</label>

							<button
								type="button"
								className="btn btn-primary lg:max-w-[10rem]">
								{t("button:send")}
							</button>
						</form>
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
				["common", "button", "home", "input", "validation"],
				nextI18nextConfig
			)),
		},
	};
};
export default Contact;
