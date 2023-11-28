import { TAddEmailSettingsToUserInput } from '@/services';

export type TUseAddEmailSettingsReturn = {
	addEmailSettings: (args: TAddEmailSettingsToUserInput) => void;
	isEmailSettingsAdding: boolean;
};
