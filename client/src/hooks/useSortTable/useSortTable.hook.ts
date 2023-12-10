import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { TBaseSortDirection, TEventUnionKeys } from '@/components';
import { TSetSortParams, TUseSortTableParams } from '@/hooks';

const useSortTable = ({
	sortKeyName,
	defaultSortKey,
	sortDirectionKeyName,
	defaultDirection,
	resetPageAfterSort,
	pageParamKey
}: TUseSortTableParams) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortDirection, setSortDirection] =
		useState<TBaseSortDirection>(defaultDirection);
	const [sortKey, setSortKey] = useState<TEventUnionKeys>(defaultSortKey);

	useEffect(() => {
		const sortDirection = (searchParams.get(sortDirectionKeyName) ||
			defaultDirection) as TBaseSortDirection;
		const sortKey = (searchParams.get(sortKeyName) ||
			defaultSortKey) as TEventUnionKeys;

		setSearchParams(searchParams);
		setSortDirection(sortDirection);
		setSortKey(sortKey);
	}, [
		defaultDirection,
		defaultSortKey,
		searchParams,
		setSearchParams,
		sortDirectionKeyName,
		sortKeyName
	]);

	const setSortParams = useCallback(
		({ sortKeyValue, sortDirectionValue }: TSetSortParams) => {
			searchParams.set(sortKeyName, sortKeyValue);
			searchParams.set(sortDirectionKeyName, sortDirectionValue);

			if (resetPageAfterSort) {
				searchParams.delete(pageParamKey);
			}
			setSearchParams(searchParams);
		},
		[
			pageParamKey,
			resetPageAfterSort,
			searchParams,
			setSearchParams,
			sortDirectionKeyName,
			sortKeyName
		]
	);

	return { setSortParams, sortDirection, sortKey };
};

export default useSortTable;
