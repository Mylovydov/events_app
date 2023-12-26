import { readCsvFile, validateEvent } from '@/utils';
import { TEvent } from '@/services';

const validateEvents = async (file: File): Promise<boolean> => {
	try {
		const events = await readCsvFile(file);
		return (events as TEvent[]).every(validateEvent);
	} catch (err) {
		return false;
	}
};
export default validateEvents;
