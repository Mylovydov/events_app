import UploadPage from '../pages/upload/Upload.page.tsx';
import { validateEvents } from '@/utils/helpers/validateEvents.ts';
import { useCreateMutation } from '@/services';
import fileToString from '../utils/helpers/fileToString.ts';

const UploadPageContainer = () => {
	const [createTrigger] = useCreateMutation();

	const onDropAccepted = async (file: File) => {
		const data = await fileToString(file);
		if (typeof data === 'string') {
			createTrigger(data);
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
			onDropAccepted={onDropAccepted}
			fileValidator={validator}
		/>
	);
};

export default UploadPageContainer;
