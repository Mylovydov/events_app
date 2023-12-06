import { TUseResetAppSettingsReturn, useNotify } from '@/hooks';
import {
	TResetAppSettingsInput,
	useResetAppSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useResetAppSettings = (): TUseResetAppSettingsReturn => {
	const { errorNotify, successNotify } = useNotify();
	const [resetAppSettingsTrigger, { isLoading: isAppSettingsResetting }] =
		useResetAppSettingsMutation();

	const resetAppSettings = useCallback(
		(args: TResetAppSettingsInput) => {
			resetAppSettingsTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[resetAppSettingsTrigger, successNotify, errorNotify]
	);

	return {
		resetAppSettings,
		isAppSettingsResetting
	};
};

export default useResetAppSettings;
