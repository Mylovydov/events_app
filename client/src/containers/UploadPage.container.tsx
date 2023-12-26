import { fileToString } from '../utils/helpers';
import { useAppSelector, useCreateEvents } from '@/hooks';
import { UploadPage } from '@/pages';
import { uploadPage, validateEvents } from '@/utils';
import { useCallback } from 'react';
import { getUserSelector } from '@/slices';

const UploadPageContainer = () => {
	const { uploadEvents, isEventsCreating } = useCreateEvents();
	const { user } = useAppSelector(getUserSelector);

	const onFileUpload = useCallback(
		async (file: File) => {
			const data = await fileToString(file);

			if (!(typeof data === 'string' && user?._id)) {
				return;
			}

			uploadEvents({
				userId: user._id,
				file: data
			});
		},
		[uploadEvents, user]
	);

	const validator = async (file: File) => {
		try {
			return await validateEvents(file);
		} catch (err) {
			return false;
		}
	};

	return (
		<UploadPage
			title={uploadPage.pageTitle}
			subtitle={uploadPage.pageSubtitle}
			dragRejectText={uploadPage.dragRejectText}
			dragAcceptText={uploadPage.dragAcceptText}
			dragPlaceholder={uploadPage.dragPlaceholder}
			fileValidator={validator}
			btnLabel="Upload events"
			onUpload={onFileUpload}
			isLoading={isEventsCreating}
		/>
	);
};

export default UploadPageContainer;
