export type TEmailSettings = {
	service: string;
	password: string;
	user: string;
};

export type TSettingsFormValues = {
	color: string;
	isAutoSendEnabled: boolean;
} & TEmailSettings;
