import { TBaseTableProps } from '@/components/baseTable/BaseTable.tsx';
import { FC } from 'react';
import { BaseTable } from '@/components';

export type TEventsTableProps = TBaseTableProps;

const EventsTable: FC<TEventsTableProps> = props => {
	return (
		<div>
			<BaseTable {...props} />
		</div>
	);
};

export default EventsTable;
