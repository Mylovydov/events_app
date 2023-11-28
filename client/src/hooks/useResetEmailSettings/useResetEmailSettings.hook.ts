import { useNotify } from '@/hooks';
import {
	TResetEmailSettingsInput,
	useResetEmailSettingsMutation
} from '@/services';
import { useCallback } from 'react';

export type TUseResetEmailSettingsReturn = {
	resetEmailSettings: (args: TResetEmailSettingsInput) => void;
	isEmailSettingsResetting: boolean;
};

const useResetEmailSettings = () => {
	const { errorNotify, successNotify } = useNotify();
	const [resetEmailSettingsTrigger, { isLoading: isEmailSettingsResetting }] =
		useResetEmailSettingsMutation();

	const resetEmailSettings = useCallback(
		(args: TResetEmailSettingsInput) => {
			resetEmailSettingsTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(err => errorNotify(err.message));
		},
		[resetEmailSettingsTrigger, successNotify, errorNotify]
	);

	return {
		resetEmailSettings,
		isEmailSettingsResetting
	};
};

export default useResetEmailSettings;
