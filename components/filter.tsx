import { Disclosure, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";
type Props = {
	onFilterChange: (data: any) => void;
};

type FilterData = {
	stars: string | number;
};
const Filter = ({ onFilterChange }: Props) => {
	const { t } = useTranslation(["common", "search", "button"]);
	const [filter, setFilter] = useState<FilterData>({
		stars: "",
	});

	// TODO: need to fix filter data based on api data
	return (
		<div className="bg-white overflow-y-auto shadow-md h-full px-4 py-8 space-y-3">
			<div className="px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:deals")}</h2>
				<ul className="space-y-1">
					<li>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">الإلغاء مجاني</span>
						</label>
					</li>
					<li>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">
								احجز الآن، ادفع عند الإقامة
							</span>
						</label>
					</li>
					<li>
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">منشآت ذات عروض خاصة</span>
						</label>
					</li>
				</ul>
			</div>
			<div className=" px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:trending")}</h2>
				<ul className="space-y-1">
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">شامل الإفطار</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">4 نجوم</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">5 نجوم</span>
						</label>
					</li>
				</ul>
			</div>
			<div className=" px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:building-types")}</h2>
				<ul className="space-y-1">
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">شقق خاصة</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق صغيرة للشباب</span>
						</label>
					</li>
					<Disclosure>
						{({ open }) => (
							<>
								{" "}
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0">
									<Disclosure.Panel className="space-y-1">
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
									</Disclosure.Panel>
								</Transition>
								<Disclosure.Button className="flex justify-start items-center gap-2">
									<h3 className="font-bold text-sm">{t("button:show-more")}</h3>
									<i
										className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
											open ? "rotate-180" : "rotate-0"
										}`}></i>
								</Disclosure.Button>
							</>
						)}
					</Disclosure>
				</ul>
			</div>
			<div className=" px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:facilities")}</h2>
				<ul className="space-y-1">
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">شقق خاصة</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق صغيرة للشباب</span>
						</label>
					</li>
					<Disclosure>
						{({ open }) => (
							<>
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0">
									<Disclosure.Panel className="space-y-1">
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
									</Disclosure.Panel>
								</Transition>
								<Disclosure.Button className="flex justify-start items-center gap-2">
									<h3 className="font-bold text-sm">{t("button:show-more")}</h3>
									<i
										className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
											open ? "rotate-180" : "rotate-0"
										}`}></i>
								</Disclosure.Button>
							</>
						)}
					</Disclosure>
				</ul>
			</div>
			<div className="px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:hotel-rating")}</h2>
				<div className="flex justify-start items-center gap-1">
					{[1, 2, 3, 4, 5].map((el) => {
						return (
							<div
								onClick={() => {
									if (el === filter.stars) {
										setFilter({ ...filter, stars: "" });
										onFilterChange({ ...filter, stars: "" });
									} else {
										setFilter({ ...filter, stars: el });
										onFilterChange({ ...filter, stars: el });
									}
								}}
								key={el}
								className={`flex justify-center items-center gap-1 cursor-pointer border border-dark border-solid p-2 w-11 h-11  ${
									filter.stars === el ? " bg-secondary" : "bg-secondary-tint"
								} hover:bg-secondary group`}>
								<i
									className={`icon-star text-xxs group-hover:text-white ${
										filter.stars === el ? "text-white" : "text-dark"
									}`}></i>
								<div
									className={` font-medium group-hover:text-white ${
										filter.stars === el ? "text-white" : "text-dark"
									}`}>
									{el}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className=" px-4 pt-3">
				<h2 className="font-bold mb-2">{t("common:hotel-type")}</h2>
				<ul className="space-y-1">
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">شقق خاصة</span>
						</label>
					</li>
					<li className="flex justify-between items-center gap-2">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
							/>
							<span className="ms-1.5 text-sm">فنادق صغيرة للشباب</span>
						</label>
					</li>
					<Disclosure>
						{({ open }) => (
							<>
								<Transition
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0">
									<Disclosure.Panel className="space-y-1">
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
										<li className="flex justify-between items-center gap-2">
											<label className="flex items-center">
												<input
													type="checkbox"
													className="form-checkbox outline-none text-primary ring-0 ring-offset-0 rounded checked:ring-primary ring-dark h-3 w-3 "
												/>
												<span className="ms-1.5 text-sm">
													فنادق صغيرة للشباب
												</span>
											</label>
										</li>
									</Disclosure.Panel>
								</Transition>
								<Disclosure.Button className="flex justify-start items-center gap-2">
									<h3 className="font-bold text-sm">{t("button:show-more")}</h3>
									<i
										className={`icon-vuesax-bold-arrow-down text-base transform transition-transform ease-in-out duration-100 ${
											open ? "rotate-180" : "rotate-0"
										}`}></i>
								</Disclosure.Button>
							</>
						)}
					</Disclosure>
				</ul>
			</div>
		</div>
	);
};

export default Filter;
