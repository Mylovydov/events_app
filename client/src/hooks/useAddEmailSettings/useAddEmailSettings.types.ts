import { TAddEmailSettingsInput } from '@/services';

export type TUseAddEmailSettingsReturn = {
	addEmailSettings: (args: TAddEmailSettingsInput) => void;
	isEmailSettingsAdding: boolean;
};
