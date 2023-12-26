import { useNotifyContext } from '@/hooks';
import { useCallback } from 'react';

const useNotify = () => {
	const { open } = useNotifyContext();

	const successNotify = useCallback(
		(message: string) => {
			open({ message, variant: 'success' });
		},
		[open]
	);

	const errorNotify = useCallback(
		(message: string) => {
			open({ message, variant: 'error' });
		},
		[open]
	);

	return { successNotify, errorNotify };
};

export default useNotify;
