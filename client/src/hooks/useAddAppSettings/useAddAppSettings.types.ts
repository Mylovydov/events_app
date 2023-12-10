import { TAddAppSettingsInput } from '@/services';

export type TUseAddAppSettingsReturn = {
	addAppSettings: (args: TAddAppSettingsInput) => void;
	isAppSettingsAdding: boolean;
};
