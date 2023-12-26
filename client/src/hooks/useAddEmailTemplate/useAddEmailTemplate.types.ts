import { TAddEmailTemplateInput } from '@/services';

export type TUseAddEmailTemplateSettingsReturn = {
	addEmailTemplateToUser: (args: TAddEmailTemplateInput) => void;
	isEmailTemplateAdding: boolean;
};
