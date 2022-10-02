import React from "react";

const LoadingCard = () => {
	return (
		<div className="border border-secondary p-4 w-full bg-white animate-pulse flex justify-center items-start h-36 gap-6 space-x-4">
			<div className=" bg-dark-tint h-full w-1/3"></div>
			<div className="flex-1 space-y-6">
				<div className="h-2 bg-dark-tint"></div>
				<div className="space-y-3">
					<div className="grid grid-cols-3 gap-4">
						<div className="h-2 bg-dark-tint col-span-2"></div>
						<div className="h-2 bg-dark-tint col-span-1"></div>
					</div>
					<div className="h-2 bg-dark-tint"></div>
				</div>
				<div className="space-y-3">
					<div className="h-2 bg-dark-tint col-span-2"></div>
					<div className="h-2 bg-dark-tint col-span-1"></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingCard;
