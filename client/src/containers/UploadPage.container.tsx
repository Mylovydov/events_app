import UploadPage from '../pages/upload/Upload.page.tsx';
import readCsvFile from '../utils/helpers/readCsvFile.ts';

const UploadPageContainer = () => {
	const onDropAccepted = async (file: File) => {
		const csv = await readCsvFile(file);
		console.log('onDropAccepted', csv);
	};
	return (
		<UploadPage
			title="Upload Page Header"
			dragRejectText="File type not accepted, sorry!"
			dragAcceptText="File type accepted, nice!"
			dragPlaceholder="Drag and drop some files here, or click to select files"
			onDropAccepted={onDropAccepted}
		/>
	);
};

export default UploadPageContainer;
