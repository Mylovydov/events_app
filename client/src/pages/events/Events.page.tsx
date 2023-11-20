import { FC } from 'react';
import EventsTable from '../../components/eventsTable/EventsTable.tsx';

import styles from './events.page.module.css';
import { TEventsPageProps } from '@/pages/events/events.page.types.ts';
import PageHeader from '../../components/pageHeader/PageHeader.tsx';

const EventsPage: FC<TEventsPageProps> = ({
	title,
	subtitle,
	...tableProps
}) => {
	return (
		<section className={styles.eventsPage}>
			<div className={styles.eventsPageHeader}>
				<PageHeader title={title} subtitle={subtitle} />
			</div>
			<div className={styles.eventsPageBody}>
				<EventsTable {...tableProps} />
			</div>
		</section>
	);
};

export default EventsPage;
