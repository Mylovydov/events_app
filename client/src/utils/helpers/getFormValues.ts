import { TUser } from '@/services';
import { isStringType } from '@/utils';

const getFormValues = (user: TUser | null) => {
	let defaultValues = {
		color: '',
		isAutoSendEnabled: false,
		service: '',
		password: '',
		user: ''
	};

	if (!user) {
		return defaultValues;
	}

	const { appSettings, emailSettings } = user;

	if (!isStringType(appSettings)) {
		defaultValues = {
			...defaultValues,
			isAutoSendEnabled: appSettings.isAutoSendEnabled,
			color: appSettings.highlightColor || ''
		};
	}

	if (!isStringType(emailSettings)) {
		const { password = '', user = '', service = '' } = emailSettings;
		defaultValues = {
			...defaultValues,
			password,
			user,
			service
		};
	}
	return defaultValues;
};

export default getFormValues;
