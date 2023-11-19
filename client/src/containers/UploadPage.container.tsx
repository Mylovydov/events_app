import UploadPage from '../pages/upload/Upload.page.tsx';
import { validateEvents } from '@/utils/helpers/validateEvents.ts';
import { fileToString } from '../utils/helpers';
import { useCreateEvents } from '@/hooks';

const UploadPageContainer = () => {
	const { uploadEvents, isEventsCreating } = useCreateEvents();

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
