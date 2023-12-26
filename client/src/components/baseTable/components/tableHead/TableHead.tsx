import { FC } from 'react';
import {
	Cell,
	ESortDirection,
	SortableCell,
	TTableHeadProps
} from '@/components';

const TableHead: FC<TTableHeadProps> = ({
	sortDirection,
	onSortDirectionChange,
	sortKey,
	columns = []
}) => {
	const handleSortingChange = (accessor: string) => {
		const newSortOrder =
			accessor === sortKey && sortDirection === ESortDirection.ASC
				? ESortDirection.DESC
				: ESortDirection.ASC;
		onSortDirectionChange && onSortDirectionChange(accessor, newSortOrder);
	};

	return (
		<thead>
			<tr>
				{columns.map(({ label, accessor, sortable }) => {
					const direction =
						sortKey === accessor && sortDirection === ESortDirection.ASC
							? sortDirection
							: ESortDirection.DESC;

					return sortable ? (
						<SortableCell
							key={accessor}
							active={sortKey === accessor}
							direction={direction}
							onClick={() => handleSortingChange(accessor)}
						>
							{label}
						</SortableCell>
					) : (
						<Cell key={accessor}>{label}</Cell>
					);
				})}
			</tr>
		</thead>
	);
};

export default TableHead;
