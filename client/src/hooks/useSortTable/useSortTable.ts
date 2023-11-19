import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import {
	TSetSortParams,
	TUseSortTableParams
} from '@/hooks/useSortTable/useSortTable.types.ts';

const useSortTable = ({
	sortKeyName,
	sortDirectionKeyName
}: TUseSortTableParams) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const setSortParams = useCallback(
		({ sortKeyValue, sortDirectionValue }: TSetSortParams) => {
			searchParams.set(sortKeyName, sortKeyValue);
			searchParams.set(sortDirectionKeyName, sortDirectionValue);
			setSearchParams(searchParams);
		},
		[searchParams, setSearchParams, sortDirectionKeyName, sortKeyName]
	);

	return { setSortParams };
};

export default useSortTable;
