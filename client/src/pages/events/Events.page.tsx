import { FC } from 'react';

import styles from './events.page.module.css';
import PageHeader from '../../components/pageHeader/PageHeader.tsx';
import { EventsTable } from '@/components';
import { TEventsPageProps } from '@/pages';

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
