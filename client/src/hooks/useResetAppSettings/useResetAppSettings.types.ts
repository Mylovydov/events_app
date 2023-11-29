import { TResetAppSettingsInput } from '@/services';

export type TUseResetAppSettingsReturn = {
	resetAppSettings: (args: TResetAppSettingsInput) => void;
	isAppSettingsResetting: boolean;
};
