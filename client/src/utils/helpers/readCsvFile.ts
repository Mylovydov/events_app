import { csvToJson } from '@/utils';

const readCsvFile = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = () => {
			const content = reader.result;
			if (content && typeof content === 'string') {
				csvToJson(content, result => resolve(result.data));
			}
		};

		reader.onerror = () => reject(reader.error);
	});

export default readCsvFile;
