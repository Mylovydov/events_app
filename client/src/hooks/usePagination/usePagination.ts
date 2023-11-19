import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePagination = (
	pageKeyName: string = 'page',
	initialPage: number = 1
) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(initialPage);

	const changePaginationPage = useCallback(
		(pageValue: number) => {
			pageValue > 1
				? searchParams.set(pageKeyName, String(pageValue))
				: searchParams.delete(pageKeyName);
			setSearchParams(searchParams);
		},
		[pageKeyName, searchParams, setSearchParams]
	);

	return { changePaginationPage, page, setPage };
};

export default usePagination;
