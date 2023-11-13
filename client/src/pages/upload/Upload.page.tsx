import styles from './upload.page.module.css';
import { Typography } from '@/components';
import DropZone from '../../components/ui/dropZone/DropZone.tsx';
import { FC } from 'react';
import { TUploadPageProps } from '@/pages/upload/upload.page.types.ts';

const UploadPage: FC<TUploadPageProps> = ({
	title,
	subtitle,
	...dragProps
}) => (
	<section className={styles.uploadPage}>
		<div className={styles.uploadPageHeader}>
			<Typography text={title} variant="h1" weight="bold" />
			{subtitle && <Typography text={subtitle} variant="h6" />}
		</div>
		<div className={styles.uploadPageBody}>
			<DropZone {...dragProps} />
		</div>
	</section>
);

export default UploadPage;
