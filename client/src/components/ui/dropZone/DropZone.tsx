import styles from './dropZone.module.css';
import { Button, TDropZoneProps, Typography, UploadedFile } from '@/components';

import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDropZone, useNotify } from '@/hooks';

const DropZone: FC<TDropZoneProps> = ({
	onDropAccepted,
	dragAcceptText,
	dragRejectText,
	dragPlaceholder,
	fileValidator,
	onUpload,
	btnLabel,
	isLoading
}) => {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const { errorNotify } = useNotify();

	const onHandleDropAccepted = async (files: File[]) => {
		setIsUploading(true);

		const file = files[0];
		let isFileValid = true;
		if (fileValidator) {
			isFileValid = await fileValidator(file);
		}
		if (!isFileValid) {
			errorNotify('File is not valid');
			setIsUploading(false);
			return;
		}

		setFile(file);
		onDropAccepted && onDropAccepted(file);
		setIsUploading(false);
	};

	const onHandleUpload = () => {
		if (!file) {
			return;
		}
		onUpload && onUpload(file);
	};

	const { getRootProps, getInputProps, isDragReject, isDragAccept } =
		useDropZone({
			onDropAccepted: onHandleDropAccepted
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

	const isBtnDisabled = !file || isUploading || isLoading;

	return (
		<div className={styles.dropZone}>
			<div className={styles.dropZoneBody}>
				<div className={uploadActionClasses} {...getRootProps()}>
					<input {...getInputProps()} />
					{contentMarkup}
				</div>
			</div>
			<div className={styles.dropZoneFooter}>
				<Button
					label={btnLabel}
					onClick={onHandleUpload}
					disabled={isBtnDisabled}
				/>
			</div>
		</div>
	);
};

export default DropZone;
