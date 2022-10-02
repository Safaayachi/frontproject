import React from "react";

type Props = {
	rating: number;
};

const StartsBox = ({ rating }: Props) => {
	return (
		<div className="flex items-center gap-1">
			{[1, 2, 3, 4, 5].map((value, index) => {
				return (
					<i
						key={index}
						className={`icon-star_black_24dp text-xl ${
							value <= rating ? "text-primary" : "text-dark-tint"
						}`}></i>
				);
			})}
		</div>
	);
};

export default StartsBox;
