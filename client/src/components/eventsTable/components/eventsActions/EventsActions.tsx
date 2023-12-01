import styles from './eventsActions.module.css';
import { FC, memo } from 'react';
import { Button, TEventsActionsProps } from '@/components';

const EventsActions: FC<TEventsActionsProps> = memo(({ actionItems }) => (
	<ul className={styles.eventsActions}>
		{actionItems.map((props, i) => (
			<li className={styles.eventsActionsItem} key={i}>
				<Button {...props} size="medium" />
			</li>
		))}
	</ul>
));

export default EventsActions;
