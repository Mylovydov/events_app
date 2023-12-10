import { TUseResetEmailSettingsReturn, useHandleError } from '@/hooks';
import {
	TResetEmailSettingsInput,
	useResetEmailSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useResetEmailSettings = (): TUseResetEmailSettingsReturn => {
	const handleError = useHandleError();
	const [resetEmailSettingsTrigger, { isLoading: isEmailSettingsResetting }] =
		useResetEmailSettingsMutation();

	const resetEmailSettings = useCallback(
		(args: TResetEmailSettingsInput) => {
			resetEmailSettingsTrigger(args).unwrap().catch(handleError);
		},
		[resetEmailSettingsTrigger, handleError]
	);

	return {
		resetEmailSettings,
		isEmailSettingsResetting
	};
};

export default useResetEmailSettings;
