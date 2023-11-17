import { Cell } from '@/components/baseTable/components/cell';
import { ESortDirection } from '@/components/baseTable/components/sortableCell/sortableCell.types.ts';
import { FC } from 'react';
import { SortableCell } from '@/components/baseTable/components';
import { TTableHeadProps } from '@/components/baseTable/components/tableHead/tableHead.types.ts';

const TableHead: FC<TTableHeadProps> = ({
	sortDirection,
	onSortDirectionChange,
	sortKey,
	columns = []
}) => {
	console.log('onSortDirectionChange', onSortDirectionChange);
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
