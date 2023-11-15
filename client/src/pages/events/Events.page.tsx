import { BaseTable } from '@/components';
import { FC } from 'react';
import { TBaseTableProps } from '@/components/baseTable/BaseTable.tsx';

export type TEventsPageProps = {
	title: string;
} & TBaseTableProps;

const EventsPage: FC<TEventsPageProps> = ({ title, ...tableProps }) => {
	return (
		<div>
			<BaseTable {...tableProps} />
		</div>
	);
};

export default EventsPage;
