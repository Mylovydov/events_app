import { FC } from 'react';
import { BaseTable } from '@/components';
import { TBaseTableProps } from '@/components/baseTable/baseTable.types.ts';

export type TEventsTableProps = TBaseTableProps;

const EventsTable: FC<TEventsTableProps> = props => {
	return (
		<div>
			<BaseTable {...props} isLastColumnSticky={true} />
		</div>
	);
};

export default EventsTable;
