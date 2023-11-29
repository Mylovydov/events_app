import { TUseResetSettingsReturn } from '@/hooks';
import { TResetAppSettingsInput, TResetEmailSettingsInput } from '@/services';
import { useCallback } from 'react';
import useResetAppSettings from '../useResetAppSettings/useResetAppSettings.hook.ts';
import useResetEmailSettingsHook from '@/hooks/useResetEmailSettings/useResetEmailSettings.hook.ts';

const useResetSettings = (): TUseResetSettingsReturn => {
	const { resetAppSettings, isAppSettingsResetting } = useResetAppSettings();
	const { resetEmailSettings, isEmailSettingsResetting } =
		useResetEmailSettingsHook();

	const resetSettings = useCallback(
		(args: TResetAppSettingsInput | TResetEmailSettingsInput) => {
			resetEmailSettings(args);
			resetAppSettings(args);
		},
		[resetEmailSettings, resetAppSettings]
	);

	return {
		resetSettings,
		isSettingsResetting: isAppSettingsResetting || isEmailSettingsResetting
	};
};

export default useResetSettings;
