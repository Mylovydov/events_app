import { csvToJson } from '@/utils';

const readCsvFile = (file: File) =>
	new Promise((resolve, reject) => {
		try {
			const reader = new FileReader();

			reader.onloadend = e => {
				const content = e.target?.result;
				if (typeof content === 'string') {
					const { data, error } = csvToJson(content);
					return error ? reject(error) : resolve(data);
				}

				if (content) {
					const dataView = new DataView(content);
					const decoder = new TextDecoder('utf-8');
					const text = decoder.decode(dataView);
					const { data, error } = csvToJson(text);
					return error ? reject(error) : resolve(data);
				}
			};

			reader.onerror = () => reject(reader.error);

			reader.readAsText(file);
		} catch (err) {
			reject(err);
		}
	});

export default readCsvFile;
