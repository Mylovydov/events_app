import { TResetEmailSettingsInput } from '@/services';

export type TUseResetEmailSettingsReturn = {
	resetEmailSettings: (args: TResetEmailSettingsInput) => void;
	isEmailSettingsResetting: boolean;
};
