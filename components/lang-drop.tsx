import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";
const LangDrop = () => {
	const languages = [
		{ verbose: "arabic", value: "ar" },
		{ verbose: "english", value: "en" },
	];
	const router = useRouter();
	const { pathname, asPath, query, locale } = router;
	const { t, i18n } = useTranslation(["common"]);
	const [selectedLanguage, setSelectedLanguage] = useState(locale);
	const changeLanguage = (language: string) => {
		setSelectedLanguage(language);
		router.push({ pathname, query }, asPath, { locale: language });
		i18n.changeLanguage(language);
	};

	return (
		<Fragment>
			<div
				onClick={() => {
					changeLanguage(i18n.language === "ar" ? "en" : "ar");
				}}
				id="mobile"
				className="flex justify-start items-center lg:hidden cursor-pointer w-full text-xl gap-2 font-ruqaa">
				<div>{t(`common:language`)}:</div>
				{i18n.language === "ar" ? (
					<i className="icon-uniE91E"></i>
				) : (
					<div>en</div>
				)}
			</div>
			<div
				onClick={() => {
					changeLanguage(i18n.language === "ar" ? "en" : "ar");
				}}
				id="web"
				className="lg:flex justify-center items-center hidden cursor-pointer w-full text-xl gap-2 font-ruqaa">
				{i18n.language === "ar" ? (
					<i className="icon-uniE91E"></i>
				) : (
					<div>en</div>
				)}
			</div>
		</Fragment>
	);
};

export default LangDrop;
