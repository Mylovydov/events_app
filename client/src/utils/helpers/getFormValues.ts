import { TUser } from '@/services';
import { isStringType } from '@/utils';

const getFormValues = (user: TUser | null) => {
	let defaultValues = {
		highlightColor: '',
		isAutoSendEnabled: false,
		service: '',
		servicePassword: '',
		serviceEmail: '',
		isSettingsVerified: false
	};

	if (!user) {
		return defaultValues;
	}

	const { appSettings, emailSettings } = user;

	if (!isStringType(appSettings)) {
		defaultValues = {
			...defaultValues,
			isAutoSendEnabled: appSettings.isAutoSendEnabled,
			highlightColor: appSettings.highlightColor || ''
		};
	}

	if (!isStringType(emailSettings)) {
		const {
			servicePassword = '',
			serviceEmail = '',
			service = '',
			isSettingsVerified = false
		} = emailSettings;

		defaultValues = {
			...defaultValues,
			servicePassword,
			serviceEmail,
			service,
			isSettingsVerified
		};
	}
	return defaultValues;
};

export default getFormValues;
