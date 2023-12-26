import { format } from 'date-fns';

const formatDate = (value: string, dateFormat = 'dd-MM-yyyy') => {
	return format(new Date(value), dateFormat);
};

export default formatDate;
