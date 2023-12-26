import styles from './upload.page.module.css';
import { FC } from 'react';
import { DropZone, PageHeader } from '@/components';
import { TUploadPageProps } from '@/pages';

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
