import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import {
	TSetSortParams,
	TUseSortTableParams
} from '@/hooks/useSortTable/useSortTable.types.ts';
import { TBaseSortDirection } from '@/components/baseTable/baseTable.types.ts';
import { TEventUnionKeys } from '@/components/eventsTable/components/eventsTableRow/eventsTableRow.types.ts';

const useSortTable = ({
	sortKeyName,
	defaultSortKey,
	sortDirectionKeyName,
	defaultDirection,
	resetPageAfterSort,
	pageParamKey
}: TUseSortTableParams) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortDirection, setSortDirection] = useState<
		TBaseSortDirection | undefined
	>(undefined);
	const [sortKey, setSortKey] = useState<TEventUnionKeys | undefined>(
		undefined
	);

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
