import { useContext } from 'react';
import { NotifyContext } from '@/providers';

const useNotifyContext = () => {
	const notifyContext = useContext(NotifyContext);
	if (!notifyContext) {
		throw new Error('useNotifyContext must be used within a NotifyProvider');
	}

	return notifyContext;
};

export default useNotifyContext;
