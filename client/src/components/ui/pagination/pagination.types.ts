import { ReactPaginateProps } from 'react-paginate';

export type TPaginationProps = {
	marginPagesDisplayed?: ReactPaginateProps['marginPagesDisplayed'];
	pageRangeDisplayed?: ReactPaginateProps['pageRangeDisplayed'];
	pageCount?: ReactPaginateProps['pageCount'];
	onPageChange: (newPage: number) => void;
} & Omit<
	ReactPaginateProps,
	'pageCount' | 'marginPagesDisplayed' | 'pageRangeDisplayed' | 'onPageChange'
>;
