import { TUseResetAppSettingsReturn, useNotify } from '@/hooks';
import {
	TResetAppSettingsInput,
	useResetAppSettingsMutation
} from '@/services';
import { useCallback } from 'react';
import useHandleError from '../useHandleError/useHandleError.hook.ts';

const useResetAppSettings = (): TUseResetAppSettingsReturn => {
	const { successNotify } = useNotify();
	const handleError = useHandleError();
	const [resetAppSettingsTrigger, { isLoading: isAppSettingsResetting }] =
		useResetAppSettingsMutation();

	const resetAppSettings = useCallback(
		(args: TResetAppSettingsInput) => {
			resetAppSettingsTrigger(args)
				.unwrap()
				.then(data => successNotify(data.message))
				.catch(handleError);
		},
		[resetAppSettingsTrigger, handleError, successNotify]
	);

	return {
		resetAppSettings,
		isAppSettingsResetting
	};
};

export default useResetAppSettings;
