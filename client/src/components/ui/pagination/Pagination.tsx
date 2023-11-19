import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styles from './pagination.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components';
import { FC, memo } from 'react';
import { TPaginationProps } from '@/components/ui/pagination/pagination.types.ts';

const Pagination: FC<TPaginationProps> = memo(
	({
		pageCount = 0,
		renderOnZeroPageCount = null,
		pageRangeDisplayed = 3,
		marginPagesDisplayed = 2,
		onPageChange,
		forcePage,
		...props
	}) => {
		const onHandlePageChange: ReactPaginateProps['onPageChange'] = ({
			selected
		}) => {
			onPageChange && onPageChange(++selected);
		};
		forcePage = forcePage && forcePage - 1;

		return (
			<ReactPaginate
				breakLabel={<Typography text="..." variant="subtitle1" />}
				nextLabel={<FontAwesomeIcon icon="chevron-right" />}
				previousLabel={<FontAwesomeIcon icon="chevron-left" />}
				containerClassName={styles.paginationContainer}
				pageClassName={styles.paginationItem}
				pageLinkClassName={styles.paginationLink}
				previousClassName={styles.paginationLink}
				nextClassName={styles.paginationLink}
				disabledClassName={styles.paginationLinkDisabled}
				activeClassName={styles.paginationLinkActive}
				pageCount={pageCount}
				forcePage={forcePage}
				pageRangeDisplayed={pageRangeDisplayed}
				marginPagesDisplayed={marginPagesDisplayed}
				renderOnZeroPageCount={renderOnZeroPageCount}
				onPageChange={onHandlePageChange}
				{...props}
			/>
		);
	}
);
export default Pagination;
