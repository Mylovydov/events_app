import { parse } from 'date-fns';

const parseAndFormatDate = (
	dateString: string,
	dateFormat = 'yyyy-MM-dd HH:mm:ss'
) => {
	const parsedDate = parse(dateString, dateFormat, new Date());
	// return formatISO(parsedDate);
};

export default parseAndFormatDate;
