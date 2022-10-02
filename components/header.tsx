import { Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState, Fragment, useEffect } from "react";
import Image from "next/image";
import LangDrop from "./lang-drop";
import { useLocalStorage, useWindowScroll } from "react-use";
import SortDrop from "./sort-drop";
const Header = () => {
	const { t } = useTranslation(["common", "button"]);
	const headerRef = useRef<HTMLDivElement>(null);
	const scrollableHeaderRef = useRef<HTMLElement>(null);
	const router = useRouter();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const mobileNavRef = useRef(null);
	const { x, y } = useWindowScroll();

	useEffect(() => {
		if (scrollableHeaderRef.current && headerRef.current) {
			if (y > 80) {
				headerRef.current.classList.replace("fixed", "hidden");
				scrollableHeaderRef.current.classList.replace("hidden", "sticky");
			} else {
				headerRef.current.classList.replace("hidden", "fixed");
				scrollableHeaderRef.current.classList.replace("sticky", "hidden");
			}
		}
	}, [y]);

	return (
		<Fragment>
			<header
				ref={headerRef}
				id="default-header"
				className={`hidden z-20 w-full bg-white shadow-md `}>
				<nav
					id="mobile-nav"
					className="flex justify-between items-center gap-4 lg:hidden px-6 py-3 container sm:mx-auto z-10 relative">
					<i
						onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
						className={`${
							isMobileNavOpen ? "icon-cross" : "icon-menu-burger-1"
						} text-dark text-lg cursor-pointer w-7`}></i>
					<Transition as={Fragment} show={isMobileNavOpen}>
						<div className="fixed h-full w-full top-[80px] rtl:right-0 ltr:left-0 bg-black/60 z-50">
							<Transition.Child
								enter="transition ease-in-out transform duration-300"
								enterFrom="-translate-y-full"
								enterTo="translate-y-0"
								leave="transition ease-in-out transform duration-300"
								leaveFrom="translate-y-0"
								leaveTo="-translate-y-full"
								as={Fragment}>
								<div ref={mobileNavRef} className={`h-fit w-full bg-white`}>
									<div className="flex flex-col border-solid border-t border-dark-tint items-start px-6 gap-4 text-xl font-ruqaa">
										<div></div>
										<Link passHref href={"/"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/"
														? "text-primary "
														: "text-secondary"
												}`}>
												{t("common:home")}
											</div>
										</Link>
										<Link passHref href={"/hotels"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/hotels"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:hotels")}
											</div>
										</Link>

										<Link passHref href={"/terms"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/terms"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:terms-conditions")}
											</div>
										</Link>
										<Link passHref href={"/privacy-policy"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/privacy-policy"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:privacy-policy")}
											</div>
										</Link>
										<Link passHref href={"/contact"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/contact"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:contact-us")}
											</div>
										</Link>

										<Link passHref href={"/login"}>
											<div
												className={`cursor-pointer group w-full border-b border-dark-tint border-solid pb-4 flex justify-start items-center gap-4 font-almarai`}>
												<i className="icon-user group-hover:text-secondary"></i>
												<div className="text-base font-bold ">
													{t("common:login")}
												</div>
											</div>
										</Link>
										<div className="pb-4">
											<LangDrop />
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</Transition>
					<Link passHref href={"/"}>
						<div className={`relative`}>
							<Image
								alt={"sadana-logo"}
								src={"/images/Group 54567.svg"}
								width={118}
								height={50}></Image>
						</div>
					</Link>
					<div></div>
				</nav>
				<nav className="hidden lg:flex flex-col">
					<div className="border-b border-solid border-dark-tint py-3">
						<div className="gap-8 px-6 container md:mx-auto flex justify-between items-center">
							<Link passHref href={"/"}>
								<div className={`relative cursor-pointer`}>
									<Image
										alt={"sadana-logo"}
										src={"/images/Group 54567.svg"}
										width={118}
										height={50}></Image>
								</div>
							</Link>
							<div className="flex justify-start items-center gap-4">
								<Link passHref href={"/login"}>
									<div
										className={`cursor-pointer group flex justify-start items-center gap-4 font-almarai`}>
										<i className="icon-user group-hover:text-secondary"></i>
										<div className="text-base font-bold whitespace-nowrap group-hover:text-secondary group-hover:underline">
											{t("common:login")}
										</div>
									</div>
								</Link>
								<i className="icon-Rectangle-9794 text-primary text-[0.4rem]"></i>
								<LangDrop />
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center h-full gap-6 py-3 text-xl font-ruqaa container mx-auto px-6 lg:px-10">
						<Link passHref href={"/"}>
							<div
								className={`cursor-pointer w-fit whitespace-nowrap ${
									router.pathname === "/" ? "text-primary " : "text-secondary"
								}`}>
								{t("common:home")}
							</div>
						</Link>
						<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
						<Link passHref href={"/hotels"}>
							<div
								className={`cursor-pointer w-fit whitespace-nowrap ${
									router.pathname === "/hotels"
										? "text-primary"
										: "text-secondary"
								}`}>
								{t("common:hotels")}
							</div>
						</Link>
						<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
						<Link passHref href={"/terms"}>
							<div
								className={`cursor-pointer w-fit whitespace-nowrap ${
									router.pathname === "/terms"
										? "text-primary"
										: "text-secondary"
								}`}>
								{t("common:terms-conditions")}
							</div>
						</Link>
						<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
						<Link passHref href={"/privacy-policy"}>
							<div
								className={`cursor-pointer w-fit whitespace-nowrap ${
									router.pathname === "/privacy-policy"
										? "text-primary"
										: "text-secondary"
								}`}>
								{t("common:privacy-policy")}
							</div>
						</Link>
						<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
						<Link passHref href={"/contact"}>
							<div
								className={`cursor-pointer w-fit whitespace-nowrap ${
									router.pathname === "/contact"
										? "text-primary"
										: "text-secondary"
								}`}>
								{t("common:contact-us")}
							</div>
						</Link>
					</div>
				</nav>
			</header>

			<header
				ref={scrollableHeaderRef}
				id="web-scrollable-header"
				className="hidden top-0 z-20 w-full bg-white shadow-md">
				<nav className="border-b border-solid border-dark-tint py-3 hidden lg:block">
					<div className="gap-8 px-6 container md:mx-auto flex justify-between items-center">
						<Link passHref href={"/"}>
							<div className={`relative cursor-pointer`}>
								<Image
									alt={"sadana-logo"}
									src={"/images/Group 54567.svg"}
									width={118}
									height={50}></Image>
							</div>
						</Link>
						<div className="flex justify-center items-center h-full gap-6 py-3 text-xl font-ruqaa container mx-auto px-6 lg:px-10">
							<Link passHref href={"/"}>
								<div
									className={`cursor-pointer w-fit whitespace-nowrap ${
										router.pathname === "/" ? "text-primary " : "text-secondary"
									}`}>
									{t("common:home")}
								</div>
							</Link>
							<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
							<Link passHref href={"/hotels"}>
								<div
									className={`cursor-pointer w-fit whitespace-nowrap ${
										router.pathname === "/hotels"
											? "text-primary"
											: "text-secondary"
									}`}>
									{t("common:hotels")}
								</div>
							</Link>
							<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
							<Link passHref href={"/terms"}>
								<div
									className={`cursor-pointer w-fit whitespace-nowrap ${
										router.pathname === "/terms"
											? "text-primary"
											: "text-secondary"
									}`}>
									{t("common:terms-conditions")}
								</div>
							</Link>
							<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
							<Link passHref href={"/privacy-policy"}>
								<div
									className={`cursor-pointer w-fit whitespace-nowrap ${
										router.pathname === "/privacy-policy"
											? "text-primary"
											: "text-secondary"
									}`}>
									{t("common:privacy-policy")}
								</div>
							</Link>
							<i className="icon-Rectangle-9794 text-dark-tint text-[0.4rem]"></i>
							<Link passHref href={"/contact"}>
								<div
									className={`cursor-pointer w-fit whitespace-nowrap ${
										router.pathname === "/contact"
											? "text-primary"
											: "text-secondary"
									}`}>
									{t("common:contact-us")}
								</div>
							</Link>
						</div>
						<div className="flex justify-start items-center gap-4">
							<Link passHref href={"/login"}>
								<div
									className={`cursor-pointer flex justify-start items-center gap-4 font-almarai`}>
									<i className="icon-user"></i>
									<div className="text-base font-bold whitespace-nowrap">
										{t("common:login")}
									</div>
								</div>
							</Link>
							<i className="icon-Rectangle-9794 text-primary text-[0.4rem]"></i>
							<LangDrop />
						</div>
					</div>
				</nav>
				<nav
					id="mobile-nav"
					className="flex justify-between items-center gap-4 lg:hidden px-6 py-3 container sm:mx-auto z-10 relative">
					<i
						onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
						className={`${
							isMobileNavOpen ? "icon-cross" : "icon-menu-burger-1"
						} text-dark text-lg cursor-pointer w-7`}></i>
					<Transition as={Fragment} show={isMobileNavOpen}>
						<div className="fixed h-full w-full top-[80px] rtl:right-0 ltr:left-0 bg-black/60 z-50">
							<Transition.Child
								enter="transition ease-in-out transform duration-300"
								enterFrom="-translate-y-full"
								enterTo="translate-y-0"
								leave="transition ease-in-out transform duration-300"
								leaveFrom="translate-y-0"
								leaveTo="-translate-y-full"
								as={Fragment}>
								<div ref={mobileNavRef} className={`h-fit w-full bg-white`}>
									<div className="flex flex-col border-solid border-t border-dark-tint items-start px-6 gap-4 text-xl font-ruqaa">
										<div></div>
										<Link passHref href={"/"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/"
														? "text-primary "
														: "text-secondary"
												}`}>
												{t("common:home")}
											</div>
										</Link>
										<Link passHref href={"/hotels"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/hotels"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:hotels")}
											</div>
										</Link>

										<Link passHref href={"/terms"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/terms"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:terms-conditions")}
											</div>
										</Link>
										<Link passHref href={"/privacy-policy"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/privacy-policy"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:privacy-policy")}
											</div>
										</Link>
										<Link passHref href={"/contact"}>
											<div
												className={`cursor-pointer w-full border-b border-dark-tint border-solid pb-4 ${
													router.pathname === "/contact"
														? "text-primary"
														: "text-secondary"
												}`}>
												{t("common:contact-us")}
											</div>
										</Link>

										<Link passHref href={"/login"}>
											<div
												className={`cursor-pointer group w-full border-b border-dark-tint border-solid pb-4 flex justify-start items-center gap-4 font-almarai`}>
												<i className="icon-user group-hover:text-secondary"></i>
												<div className="text-base font-bold ">
													{t("common:login")}
												</div>
											</div>
										</Link>
										<div className="pb-4">
											<LangDrop />
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</Transition>
					<Link passHref href={"/"}>
						<div className={`relative`}>
							<Image
								alt={"sadana-logo"}
								src={"/images/Group 54567.svg"}
								width={118}
								height={50}></Image>
						</div>
					</Link>
					<div></div>
				</nav>
			</header>
		</Fragment>
	);
};

export default Header;
