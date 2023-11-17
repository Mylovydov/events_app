import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import { TSetSortParams } from '@/hooks/useSortTable/useSortTable.types.ts';

const useSortTable = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const setSortParams = useCallback(
		({
			sortKeyName,
			sortKeyValue,
			sortDirectionKeyName,
			sortDirectionValue
		}: TSetSortParams) => {
			searchParams.set(sortKeyName, sortKeyValue);
			searchParams.set(sortDirectionKeyName, sortDirectionValue);
			setSearchParams(searchParams);
		},
		[searchParams, setSearchParams]
	);

	return { setSortParams };
};

export default useSortTable;
