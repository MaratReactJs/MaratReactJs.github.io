import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
	currentPage: number;
	onPageNumberChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onPageNumberChange,
}) => (
	<ReactPaginate
		className={styles.root}
		breakLabel="..."
		nextLabel=">"
		onPageChange={(event) => onPageNumberChange(event.selected + 1)}
		pageRangeDisplayed={4}
		pageCount={3}
		forcePage={currentPage - 1}
		previousLabel="<"
	/>
);

export default Pagination;
