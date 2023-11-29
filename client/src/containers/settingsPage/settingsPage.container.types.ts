export type TEmailSettings = {
	service: string;
	servicePassword: string;
	serviceEmail: string;
	isSettingsVerified: boolean;
};

export type TAppSettings = {
	highlightColor: string;
	isAutoSendEnabled: boolean;
};

export type TSettingsFormValues = TAppSettings & TEmailSettings;
