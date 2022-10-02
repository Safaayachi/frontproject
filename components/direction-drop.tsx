import { Combobox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useCities } from "../hooks/useCities";
type Direction = {
	Id: number;
	Name: string;
	NameAr: string;
};

type Props = {
	onChangeDirection: (_id: number) => void;
	directions: Direction[];
};

const DirectionDrop = ({ onChangeDirection, directions }: Props) => {
	const { t, i18n } = useTranslation(["input", "button", "home"]);
	const router = useRouter();
	const [selectedDirection, setSelectedDirection] = useState<Direction>(
		Number(router.query.city) !== 0 && directions
			? (directions.find(
					(c: any) => c.Id === Number(router.query.city)
			  ) as Direction)
				? (directions.find(
						(c: any) => c.Id === Number(router.query.city)
				  ) as Direction)
				: {
						NameAr: "",
						Name: "",
						Id: 0,
				  }
			: {
					NameAr: "",
					Name: "",
					Id: 0,
			  }
	);

	const [query, setQuery] = useState("");
	const [isMobileDropOpen, setIsMobileDropOpen] = useState(false);
	const [allDirections, setAllDirections] = useState<Direction[]>(directions);

	const filteredDirections = useMemo(
		() =>
			query === ""
				? allDirections
				: allDirections.filter((direction: Direction) => {
						return i18n.language === "ar"
							? direction.NameAr.toLowerCase().includes(query.toLowerCase())
							: direction.Name.toLowerCase().includes(query.toLowerCase());
				  }),
		[query]
	);

	return (
		<Fragment>
			<Combobox
				className="hidden relative justify-between lg:flex flex-col gap-2 col-span-12 lg:col-span-3"
				as={"div"}
				value={selectedDirection}
				onChange={setSelectedDirection}>
				{({ open }) => (
					<>
						<Combobox.Button
							className={"h-full flex flex-col justify-center gap-1 px-6"}>
							<div className="flex justify-start items-center gap-2 ">
								<i className="icon-marker text-secondary text-xs"></i>
								<div className="text-secondary text-xs">
									{t("common:direction")}
								</div>
							</div>

							<div className="flex justify-between items-center gap-4 ">
								<Combobox.Input
									className="py-0 border-0 text-lg"
									onChange={(event) => setQuery(event.target.value)}
									placeholder={t("input:choose-direction")}
									displayValue={(dir: Direction) =>
										i18n.language === "ar" ? dir.NameAr : dir.Name
									}
								/>

								<i className="icon-expand_more_black_24dp text-lg text-primary"></i>
							</div>
						</Combobox.Button>
						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => setQuery("")}>
							<Combobox.Options className="absolute top-20 rtl:right-6 ltr:left-6 w-full overflow-y-auto bg-white flex flex-col gap-2 p-4 rounded-2xl shadow-t z-40">
								{filteredDirections &&
									filteredDirections.map((direction: Direction) => (
										<Combobox.Option
											key={
												i18n.language === "ar"
													? direction.NameAr
													: direction.Name
											}
											value={direction}
											className={
												"cursor-pointer border-b border-solid border-dark-tint last:border-b-0 pb-3 last:pb-0"
											}
											onClick={() => {
												setSelectedDirection(direction);
												onChangeDirection(direction.Id);
											}}>
											{i18n.language === "ar"
												? direction.NameAr
												: direction.Name}
										</Combobox.Option>
									))}
							</Combobox.Options>
						</Transition>
					</>
				)}
			</Combobox>
			<div
				onClick={() => setIsMobileDropOpen(true)}
				className={`lg:hidden flex flex-col gap-1 py-2 px-6 bg-white rounded-full col-span-12`}>
				<div className="flex justify-start items-center gap-2 ">
					<i className="icon-marker text-secondary text-xs"></i>
					<div className="text-secondary text-xs">{t("common:direction")}</div>
				</div>
				<div className="flex justify-between items-center gap-4">
					<input
						className="p-0 placeholder-dark text-sm font-bold border-0"
						type="text"
						placeholder={t("input:choose-direction")}
						readOnly
						value={
							i18n.language === "ar"
								? selectedDirection?.NameAr
								: selectedDirection?.Name
						}
					/>
				</div>
			</div>

			<Transition
				show={isMobileDropOpen}
				as={Fragment}
				enter="transition ease-in-out duration-100"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition ease-in-out duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				afterLeave={() => setQuery("")}>
				<div className="fixed flex lg:hidden flex-col w-full h-full top-0 rtl:right-0 ltr:left-0 z-50 bg-white">
					<div className="flex justify-between items-center mb-2 shadow-md py-5 px-6">
						<i
							onClick={() => {
								setTimeout(() => {
									setIsMobileDropOpen(false);
								}, 0);
							}}
							className="icon-angle-small-left text-2xl text-primary cursor-pointer transform ltr:rotate-180"></i>
						<div className="font-bold">{t("common:direction")}</div>
						<i className="icon-angle-small-left-1 text-2xl invisible"></i>
					</div>
					<div className="w-full flex flex-col gap-2 py-5 px-4">
						{allDirections?.map((direction: Direction) => (
							<div
								onClick={() => {
									setSelectedDirection(direction);
									onChangeDirection(direction.Id);
								}}
								key={direction.Id}
								className="flex justify-between items-center gap-2 border-b border-solid border-dark-tint pb-4">
								<div>
									{i18n.language === "ar" ? direction.NameAr : direction.Name}
								</div>

								<label className="inline-flex items-center">
									<input
										type="radio"
										className="form-radio focus:ring-0 text-secondary"
										name="radio"
										onChange={() => setSelectedDirection(direction)}
										checked={selectedDirection?.Id === direction.Id}
									/>
								</label>
							</div>
						))}
					</div>
					<div className="px-6 py-5 mt-auto w-full shadow-t-md">
						<button
							onClick={() => {
								setIsMobileDropOpen(false);
							}}
							className="btn btn-primary ">
							{t("button:apply")}
						</button>
					</div>
				</div>
			</Transition>
		</Fragment>
	);
};

export default DirectionDrop;
