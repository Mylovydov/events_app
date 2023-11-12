import UploadPage from '../pages/upload/Upload.page.tsx';
import { validateEvents } from '@/utils/helpers/validateEvents.ts';
import { fileToString } from '../utils/helpers';
import useUploadEvents from '../services/hooks/events/useUploadEvents.ts';

const UploadPageContainer = () => {
	const { uploadEvents, isEventsUploading } = useUploadEvents();

	const onFileUpload = async (file: File) => {
		const data = await fileToString(file);
		if (typeof data === 'string') {
			uploadEvents(data);
		}
	};

	const validator = async (file: File) => {
		try {
			return await validateEvents(file);
		} catch (err) {
			return false;
		}
	};

	return (
		<UploadPage
			title="Upload Page Header"
			dragRejectText="File type not accepted, sorry!"
			dragAcceptText="File type accepted, nice!"
			dragPlaceholder="Drag and drop some files here, or click to select files"
			fileValidator={validator}
			btnLabel="Upload events"
			onUpload={onFileUpload}
			isLoading={isEventsUploading}
		/>
	);
};

export default UploadPageContainer;
