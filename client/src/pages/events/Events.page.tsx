import { FC } from 'react';

import styles from './events.page.module.css';
import { EventsTable, PageHeader } from '@/components';
import { TEventsPageProps } from '@/pages';

const EventsPage: FC<TEventsPageProps> = ({
	title,
	subtitle,
	...tableProps
}) => (
	<section className={styles.eventsPage}>
		<div className={styles.eventsPageHeader}>
			<PageHeader title={title} subtitle={subtitle} />
		</div>
		<div className={styles.eventsPageBody}>
			<EventsTable {...tableProps} />
		</div>
	</section>
);

export default EventsPage;
