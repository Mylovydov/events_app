import styles from './upload.page.module.css';
import { Typography } from '@/components';
import DropZone, {
	TDropZoneProps
} from '../../components/ui/dropZone/DropZone.tsx';
import { FC } from 'react';

export type TUploadPageProps = {
	title: string;
} & TDropZoneProps;

const UploadPage: FC<TUploadPageProps> = ({ title, ...dragProps }) => (
	<section className={styles.uploadPage}>
		<div className={styles.uploadPageHeader}>
			<Typography text={title} variant="h4" weight="bold" />
		</div>
		<div className={styles.uploadPageBody}>
			<DropZone {...dragProps} />
		</div>
	</section>
);

export default UploadPage;
