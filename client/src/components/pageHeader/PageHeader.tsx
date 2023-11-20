import styles from './pageHeader.module.css';
import { FC } from 'react';
import { TPageHeaderProps } from '@/components/pageHeader/pageHeader.types.ts';
import { Typography } from '@/components';

const PageHeader: FC<TPageHeaderProps> = ({ title, subtitle }) => {
	return (
		<div className={styles.pageHeader}>
			<Typography text={title} variant="h1" weight="bold" />
			{subtitle && <Typography text={subtitle} variant="subtitle1" />}
		</div>
	);
};

export default PageHeader;
