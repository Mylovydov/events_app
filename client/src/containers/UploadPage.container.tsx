import UploadPage from '../pages/upload/Upload.page.tsx';

const UploadPageContainer = () => {
	return (
		<UploadPage
			title="Upload Page Header"
			dragRejectText="File type not accepted, sorry!"
			dragAcceptText="File type accepted, nice!"
			dragPlaceholder="Drag and drop some files here, or click to select files"
		/>
	);
};

export default UploadPageContainer;
