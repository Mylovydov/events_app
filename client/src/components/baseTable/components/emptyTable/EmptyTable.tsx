import { FC } from 'react';
import styles from './emptyTable.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components';
import { TEmptyTableProps } from '@/components/baseTable/components/emptyTable/emptyTable.types.ts';

const EmptyTable: FC<TEmptyTableProps> = ({
	icon = 'face-sad-tear',
	children
}) => (
	<div className={styles.emptyTable}>
		<div className={styles.emptyTableIcon}>
			<FontAwesomeIcon icon={icon} />
		</div>
		<div className={styles.emptyTableContent}>
			<Typography textAlign="center" variant="body1" weight="semi">
				{children}
			</Typography>
		</div>
	</div>
);

export default EmptyTable;
