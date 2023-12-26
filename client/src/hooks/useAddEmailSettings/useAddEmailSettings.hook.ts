import { TUseAddEmailSettingsReturn, useHandleError } from '@/hooks';
import {
	TAddEmailSettingsInput,
	useAddEmailSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailSettings = (): TUseAddEmailSettingsReturn => {
	const handleError = useHandleError();
	const [addEmailSettingsTrigger, { isLoading: isEmailSettingsAdding }] =
		useAddEmailSettingsMutation();

	const addEmailSettings = useCallback(
		(args: TAddEmailSettingsInput) => {
			addEmailSettingsTrigger(args).unwrap().catch(handleError);
		},
		[addEmailSettingsTrigger, handleError]
	);

	return {
		addEmailSettings,
		isEmailSettingsAdding
	};
};

export default useAddEmailSettings;
