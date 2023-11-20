import styles from './upload.page.module.css';
import { FC } from 'react';
import { TUploadPageProps } from '@/pages/upload/upload.page.types.ts';
import { DropZone, PageHeader } from '@/components';

const UploadPage: FC<TUploadPageProps> = ({
	title,
	subtitle,
	...dragProps
}) => (
	<section className={styles.uploadPage}>
		<div className={styles.uploadPageHeader}>
			<PageHeader title={title} subtitle={subtitle} />
		</div>
		<div className={styles.uploadPageBody}>
			<DropZone {...dragProps} />
		</div>
	</section>
);

export default UploadPage;
