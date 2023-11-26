import { fileToString } from '../utils/helpers';
import { useCreateEvents, useUserContext } from '@/hooks';
import { UploadPage } from '@/pages';
import { validateEvents } from '@/utils';
import { useCallback } from 'react';

const UploadPageContainer = () => {
	const { uploadEvents, isEventsCreating } = useCreateEvents();
	const { user } = useUserContext();

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
			title="Events Upload"
			subtitle="Upload your events in csv format"
			dragRejectText="File type not accepted, sorry!"
			dragAcceptText="File type accepted, nice!"
			dragPlaceholder="Drag and drop some files here, or click to select files"
			fileValidator={validator}
			btnLabel="Upload events"
			onUpload={onFileUpload}
			isLoading={isEventsCreating}
		/>
	);
};

export default UploadPageContainer;
