import { TUseAddEmailSettingsReturn, useNotify } from '@/hooks';
import {
	TAddEmailSettingsToUserInput,
	useAddEmailSettingsToUserMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailSettings = (): TUseAddEmailSettingsReturn => {
	const { successNotify, errorNotify } = useNotify();
	const [addEmailSettingsTrigger, { isLoading: isEmailSettingsAdding }] =
		useAddEmailSettingsToUserMutation();

	const addEmailSettings = useCallback(
		(args: TAddEmailSettingsToUserInput) => {
			addEmailSettingsTrigger(args)
				.unwrap()
				.catch(err => errorNotify(err.message));
		},
		[addEmailSettingsTrigger, successNotify, errorNotify]
	);

	return {
		addEmailSettings,
		isEmailSettingsAdding
	};
};

export default useAddEmailSettings;
