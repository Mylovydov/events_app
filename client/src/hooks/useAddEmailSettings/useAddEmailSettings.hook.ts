import { TUseAddEmailSettingsReturn, useNotify } from '@/hooks';
import {
	TAddEmailSettingsInput,
	useAddEmailSettingsMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailSettings = (): TUseAddEmailSettingsReturn => {
	const { errorNotify } = useNotify();
	const [addEmailSettingsTrigger, { isLoading: isEmailSettingsAdding }] =
		useAddEmailSettingsMutation();

	const addEmailSettings = useCallback(
		(args: TAddEmailSettingsInput) => {
			addEmailSettingsTrigger(args)
				.unwrap()
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[addEmailSettingsTrigger, errorNotify]
	);

	return {
		addEmailSettings,
		isEmailSettingsAdding
	};
};

export default useAddEmailSettings;
