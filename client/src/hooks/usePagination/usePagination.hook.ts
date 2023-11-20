import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGE_PARAM_KEY } from '@/utils';

const usePagination = (
	pageKeyName: string = 'page',
	initialPage: number = 1
) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(initialPage);

	useEffect(() => {
		const page = parseInt(searchParams.get(pageKeyName) || '1', 10);
		page > 1
			? searchParams.set(PAGE_PARAM_KEY, String(page))
			: searchParams.delete(PAGE_PARAM_KEY);
		setSearchParams(searchParams);
		setPage(page);
	}, [pageKeyName, searchParams, setSearchParams]);

	const changePaginationPage = useCallback(
		(pageValue: number) => {
			pageValue > 1
				? searchParams.set(pageKeyName, String(pageValue))
				: searchParams.delete(pageKeyName);
			setSearchParams(searchParams);
		},
		[pageKeyName, searchParams, setSearchParams]
	);

	const resetPage = useCallback(() => {
		//TODO: ask Taras about synchronization pagination and sorting
		searchParams.set(pageKeyName, '1');
		setSearchParams(searchParams);
		setPage(initialPage);
	}, [pageKeyName, searchParams, setSearchParams]);

	return { changePaginationPage, page, setPage, resetPage };
};

export default usePagination;
