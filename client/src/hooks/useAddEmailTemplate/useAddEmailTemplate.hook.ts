import { TUseAddEmailTemplateSettingsReturn, useNotify } from '@/hooks';
import {
	TAddEmailTemplateInput,
	useAddEmailTemplateMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailTemplate = (): TUseAddEmailTemplateSettingsReturn => {
	const { successNotify, errorNotify } = useNotify();
	const [addAddEmailTemplateTrigger, { isLoading: isEmailTemplateAdding }] =
		useAddEmailTemplateMutation();

	const addEmailTemplateToUser = useCallback(
		(args: TAddEmailTemplateInput) => {
			addAddEmailTemplateTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(({ message, zodError }) => errorNotify(zodError || message));
		},
		[addAddEmailTemplateTrigger, successNotify, errorNotify]
	);

	return {
		addEmailTemplateToUser,
		isEmailTemplateAdding
	};
};

export default useAddEmailTemplate;
