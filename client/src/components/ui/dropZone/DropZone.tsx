import styles from './dropZone.module.css';
import { Typography } from '@/components';
import useDropZone from './hooks/useDropZone.hook.ts';
import UploadedFile from './components/uploadedFile/UploadedFile.tsx';
import classNames from 'classnames';
import { FC, useState } from 'react';
import { TDropZoneProps } from './dropZone.types.ts';

const DropZone: FC<TDropZoneProps> = ({
	onDropAccepted,
	dragAcceptText,
	dragRejectText,
	dragPlaceholder,
	fileValidator
}) => {
	const [file, setFile] = useState<File | null>(null);
	const onHandleDropAccepted = async (files: File[]) => {
		const file = files[0];
		let isFileValid = true;
		if (fileValidator) {
			isFileValid = await fileValidator(file);
		}
		if (!isFileValid) {
			return;
		}

		setFile(file);
		onDropAccepted && onDropAccepted(file);
	};

	const { getRootProps, getInputProps, isDragReject, isDragAccept } =
		useDropZone({
			onDropAccepted: onHandleDropAccepted
			// onDrop: acceptedFiles => {
			// 	console.log('onDrop', acceptedFiles);
			// }
		});

	const rejectedDragTextMarkup = isDragReject && dragRejectText;
	const acceptedDragTextMarkup = isDragAccept && dragAcceptText;

	const uploadFilesMarkup = file && (
		<UploadedFile fileSize={file.size} filename={file.name} />
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
