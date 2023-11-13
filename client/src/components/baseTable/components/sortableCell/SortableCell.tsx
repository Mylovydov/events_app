import { Cell } from '../cell';
import styles from './sortableCell.module.css';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
	ESortDirection,
	TSortableCellProps
} from '@/components/baseTable/components/sortableCell/sortableCell.types.ts';

const SortableCell: FC<TSortableCellProps> = ({
	children,
	active,
	direction
}) => {
	const topIconClasses = classNames({
		[styles.iconTop]: true,
		[styles.iconActive]: active && direction === ESortDirection.ASC
	});

	const bottomIconClasses = classNames({
		[styles.iconBottom]: true,
		[styles.iconActive]: active && direction === ESortDirection.DESC
	});

	return (
		<Cell>
			<span className={styles.sortableLabel}>
				{children}
				<span className={styles.sortableLabelIcons}>
					<FontAwesomeIcon
						icon="caret-up"
						fontSize="1.2rem"
						className={topIconClasses}
					/>
					<FontAwesomeIcon
						icon="caret-down"
						fontSize="1.2rem"
						className={bottomIconClasses}
					/>
				</span>
			</span>
		</Cell>
	);
};

export default SortableCell;
