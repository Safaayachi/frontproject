import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";

type Props = {
	onClose: () => void;
	text: any;
};

function ModalError({ onClose, text }: Props) {
	const { t } = useTranslation(["common", "search", "button"]);
	return (
		<>
			<div className="fixed top-0 start-0 z-50 h-screen w-screen bg-black/60 flex justify-center items-center">
				<div className="bg-white w-[300px] h-[300px] px-6 py-8 relative flex flex-col  justify-between">
					<i
						onClick={() => {
							onClose();
						}}
						className="icon-vuesax-outline-close-square text-3xl font-bold absolute top-2 start-3 cursor-pointer "></i>

					<div className="flex justify-center flex-col items-center gap-5">
						<div className="block ">
							<Image
								alt={"error-image"}
								src={"/images/error.png"}
								width={100}
								height={100}></Image>
						</div>

						<h2 className="text-dark-shade text-2xl font-bold text-center ">
							{text}
						</h2>
					</div>
					<div className="mb-0 ">
						<button
							className="btn-primary btn  font-bold "
							type="submit"
							onClick={() => {
								onClose();
							}}>
							{t("button:okay")}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ModalError;
