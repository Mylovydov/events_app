import { TUseAddAppSettingsReturn, useNotify } from '@/hooks';
import { TAddAppSettingsInput, useAddAppSettingsMutation } from '@/services';
import { useCallback } from 'react';
import useHandleError from '../useHandleError/useHandleError.hook.ts';

const useAddAppSettings = (): TUseAddAppSettingsReturn => {
	const handleError = useHandleError();
	const { successNotify } = useNotify();
	const [addAppSettingsTrigger, { isLoading: isAppSettingsAdding }] =
		useAddAppSettingsMutation();

	const addAppSettings = useCallback(
		(args: TAddAppSettingsInput) => {
			addAppSettingsTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(handleError);
		},
		[addAppSettingsTrigger, successNotify, handleError]
	);

	return {
		addAppSettings,
		isAppSettingsAdding
	};
};

export default useAddAppSettings;
