import { TUseAddEmailTemplateSettingsReturn, useNotify } from '@/hooks';
import {
	TAddEmailTemplateByUserIdInput,
	useAddEmailTemplateByUserIdMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailTemplate = (): TUseAddEmailTemplateSettingsReturn => {
	const { successNotify, errorNotify } = useNotify();
	const [addAddEmailTemplateTrigger, { isLoading: isEmailTemplateAdding }] =
		useAddEmailTemplateByUserIdMutation();

	const addEmailTemplateToUser = useCallback(
		(args: TAddEmailTemplateByUserIdInput) => {
			addAddEmailTemplateTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(err => errorNotify(err.message));
		},
		[addAddEmailTemplateTrigger, successNotify, errorNotify]
	);

	return {
		addEmailTemplateToUser,
		isEmailTemplateAdding
	};
};

export default useAddEmailTemplate;
