import Papa, { ParseResult } from 'papaparse';

export type TOnComplete = (
	results: ParseResult<never>,
	file: undefined
) => void;

const csvToJson = (content: string, onComplete: TOnComplete) =>
	Papa.parse(content, {
		header: true,
		skipEmptyLines: true,
		complete: onComplete
	});

export default csvToJson;
