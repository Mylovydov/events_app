import UploadPage from '../pages/upload/Upload.page.tsx';
import { readCsvFile } from '@/utils';

// const validateCsvFile = (events: unknown) => {};

const UploadPageContainer = () => {
	const onDropAccepted = async (file: File) => {};

	const validator = async (file: File) => {
		try {
			const csv = await readCsvFile(file);
			console.log('validator', csv);
			return false;
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
