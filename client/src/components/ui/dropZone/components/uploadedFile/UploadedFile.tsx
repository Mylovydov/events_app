import styles from './uploadedFile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components';
import { FC } from 'react';
import { TUploadedFileProps } from '@/components/ui/dropZone/components/uploadedFile/uploadedFile.types.ts';

const UploadedFile: FC<TUploadedFileProps> = ({ filename, fileSize }) => (
	<div className={styles.uploadedFile}>
		<div className={styles.uploadedFileIcon}>
			<FontAwesomeIcon icon="file-csv" fontSize="4rem" />
		</div>
		<div className={styles.uploadedFileBody}>
			<Typography
				text={`File name: ${filename}`}
				textAlign="center"
				weight="semi"
			/>
			<Typography text={`Size: ${fileSize} bytes`} textAlign="center" />
		</div>
	</div>
);

export default UploadedFile;
