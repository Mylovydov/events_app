import { DropzoneOptions, useDropzone } from 'react-dropzone';

export const CSVFormat = {
	name: 'csv',
	format: 'text/csv',
	variants: ['.csv']
};

const megabytesToBytes = (mb: number) => {
	return mb * 1024 * 1024;
};

const useDropZone = (props: DropzoneOptions) =>
	useDropzone({
		...props,
		accept: {
			'text/*': CSVFormat.variants
		},
		maxFiles: 1,
		maxSize: megabytesToBytes(2),
		multiple: false,
		validator: file => {
			if (file.type === CSVFormat.format) {
				return null;
			}
			return {
				code: 'file-invalid-ext',
				message: 'File extension must be .csv'
			};
		}
	});

export default useDropZone;
