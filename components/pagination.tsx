import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
const Pagination = (props: any) => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange!.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<ul className={"pagination-container"}>
			<button
				className={"pagination-item"}
				onClick={onPrevious}
				disabled={currentPage === 1}>
				<i className="icon-angle-small-left-1" />
			</button>
			{paginationRange!.map((pageNumber, ip) => {
				if (pageNumber === DOTS) {
					return (
						<li key={ip} className="pagination-item dots">
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={ip}
						className={`pagination-item ${
							pageNumber === currentPage && "selected"
						}`}
						onClick={() => onPageChange(pageNumber)}>
						{pageNumber}
					</li>
				);
			})}
			<button
				className={"pagination-item"}
				onClick={onNext}
				disabled={currentPage === lastPage}>
				<i className="icon-angle-small-left" />
			</button>
		</ul>
	);
};

export default Pagination;
