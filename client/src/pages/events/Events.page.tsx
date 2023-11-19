import { FC } from 'react';
import EventsTable from '../../components/eventsTable/EventsTable.tsx';

import styles from './events.page.module.css';
import { Typography } from '@/components';
import { TEventsPageProps } from '@/pages/events/events.page.types.ts';

const EventsPage: FC<TEventsPageProps> = ({
	title,
	subtitle,
	...tableProps
}) => {
	return (
		<div className={styles.eventsPage}>
			<div className={styles.eventsPageHeader}>
				<Typography text={title} variant="h1" weight="bold" />
				{subtitle && <Typography text={subtitle} variant="h6" />}
			</div>
			<div className={styles.eventsPageBody}>
				<EventsTable {...tableProps} />
			</div>
		</div>
	);
};

export default EventsPage;
