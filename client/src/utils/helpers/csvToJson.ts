import Papa from 'papaparse';

export type TCsvToJsonResult = {
	data: unknown[] | null;
	error: string | null;
};

const csvToJson = (content: string): TCsvToJsonResult => {
	try {
		const { errors, data } = Papa.parse(content, {
			header: true,
			skipEmptyLines: true
		});

		const csvToJsonResult: TCsvToJsonResult = {
			data,
			error: null
		};

		if (!errors.length) {
			return csvToJsonResult;
		}

		csvToJsonResult.error = errors.map(error => error.message).join('\n');
		return csvToJsonResult;
	} catch {
		return {
			data: null,
			error: 'Unexpected error occurred while parsing CSV file.'
		};
	}
};

export default csvToJson;
