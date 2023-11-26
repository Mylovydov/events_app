import { TAddEmailTemplateByUserIdInput } from '@/services';

export type TUseAddEmailTemplateSettingsReturn = {
	addEmailTemplateToUser: (args: TAddEmailTemplateByUserIdInput) => void;
	isEmailTemplateAdding: boolean;
};
