import { useContext } from 'react';
import { UserContext } from '@/providers';

const useUserContext = () => {
	const userContext = useContext(UserContext);
	if (!userContext) {
		throw new Error('userContext must be used within a UserProvider');
	}

	return userContext;
};

export default useUserContext;
