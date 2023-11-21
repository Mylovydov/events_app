import { useNotify } from '@/hooks';
import {
	TAddAppSettingsUserInput,
	useAddAppSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useAddAppSettings = () => {
	const { successNotify, errorNotify } = useNotify();
	const [addAppSettingsTrigger, { isLoading: isAppSettingsAdding }] =
		useAddAppSettingsMutation();

	const addAppSettings = useCallback(
		(args: TAddAppSettingsUserInput) => {
			addAppSettingsTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(err => {
					console.log('err============addAppSettings============', err);
					errorNotify(err.message);
				});
		},
		[addAppSettingsTrigger, successNotify, errorNotify]
	);

	return {
		addAppSettings,
		isAppSettingsAdding
	};
};

export default useAddAppSettings;
