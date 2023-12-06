import { TUseResetEmailSettingsReturn, useNotify } from '@/hooks';
import {
	TResetEmailSettingsInput,
	useResetEmailSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useResetEmailSettings = (): TUseResetEmailSettingsReturn => {
	const { errorNotify } = useNotify();
	const [resetEmailSettingsTrigger, { isLoading: isEmailSettingsResetting }] =
		useResetEmailSettingsMutation();

	const resetEmailSettings = useCallback(
		(args: TResetEmailSettingsInput) => {
			resetEmailSettingsTrigger(args)
				.unwrap()
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[resetEmailSettingsTrigger, errorNotify]
	);

	return {
		resetEmailSettings,
		isEmailSettingsResetting
	};
};

export default useResetEmailSettings;
