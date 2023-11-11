import styles from './dropZone.module.css';
import { Typography } from '@/components';
import useDropZone from './hooks/useDropZone.hook.ts';
import UploadedFile from './components/uploadedFile/UploadedFile.tsx';
import classNames from 'classnames';
import { FC } from 'react';
import { TDropZoneProps } from '@/components/ui/dropZone/dropZOne.types.ts';

const DropZone: FC<TDropZoneProps> = ({
	onDropAccepted,
	dragAcceptText,
	dragRejectText,
	dragPlaceholder
}) => {
	const onHandleDropAccepted = (files: File[]) => {
		onDropAccepted && onDropAccepted(files);
	};

	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		isDragReject,
		isDragAccept
	} = useDropZone({
		onDropAccepted: onHandleDropAccepted
	});

	const rejectedDragTextMarkup = isDragReject && dragRejectText;
	const acceptedDragTextMarkup = isDragAccept && dragAcceptText;

	const uploadFilesMarkup = acceptedFiles.length && (
		<UploadedFile
			fileSize={acceptedFiles[0].size}
			filename={acceptedFiles[0].name}
		/>
	);

	const placeholderMarkup = (
		<Typography variant="h6" weight="bold">
			{rejectedDragTextMarkup || acceptedDragTextMarkup || dragPlaceholder}
		</Typography>
	);

	const contentMarkup = uploadFilesMarkup || placeholderMarkup;

	const uploadActionClasses = classNames({
		[styles.uploadAction]: true,
		[styles.dragReject]: isDragReject,
		[styles.dragAccept]: isDragAccept
	});

	return (
		<div className={styles.dropZone}>
			<div className={styles.dropBody}>
				<div className={uploadActionClasses} {...getRootProps()}>
					<input {...getInputProps()} />
					{contentMarkup}
				</div>
			</div>
		</div>
	);
};

export default DropZone;
