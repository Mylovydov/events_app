import { TResetAppSettingsInput, TResetEmailSettingsInput } from '@/services';

export type TUseResetSettingsReturn = {
	resetSettings: (
		args: TResetAppSettingsInput | TResetEmailSettingsInput
	) => void;
	isSettingsResetting: boolean;
};
