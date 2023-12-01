import { useNotify } from '@/hooks';
import { TAddAppSettingsInput, useAddAppSettingsMutation } from '@/services';
import { useCallback } from 'react';

const useAddAppSettings = () => {
	const { successNotify, errorNotify } = useNotify();
	const [addAppSettingsTrigger, { isLoading: isAppSettingsAdding }] =
		useAddAppSettingsMutation();

	const addAppSettings = useCallback(
		(args: TAddAppSettingsInput) => {
			addAppSettingsTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[addAppSettingsTrigger, successNotify, errorNotify]
	);

	return {
		addAppSettings,
		isAppSettingsAdding
	};
};

export default useAddAppSettings;
