export type TEmailSettings = {
	service: string;
	password: string;
	user: string;
};

export type TAppSettings = {
	color: string;
	isAutoSendEnabled: boolean;
};

export type TSettingsFormValues = TAppSettings & TEmailSettings;
