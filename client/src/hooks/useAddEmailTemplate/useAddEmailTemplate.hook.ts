import {
	TUseAddEmailTemplateSettingsReturn,
	useHandleError,
	useNotify
} from '@/hooks';
import {
	TAddEmailTemplateInput,
	useAddEmailTemplateMutation
} from '@/services';
import { useCallback } from 'react';

const useAddEmailTemplate = (): TUseAddEmailTemplateSettingsReturn => {
	const { successNotify } = useNotify();
	const handleError = useHandleError();
	const [addAddEmailTemplateTrigger, { isLoading: isEmailTemplateAdding }] =
		useAddEmailTemplateMutation();

	const addEmailTemplateToUser = useCallback(
		(args: TAddEmailTemplateInput) => {
			addAddEmailTemplateTrigger(args)
				.unwrap()
				.then(data => {
					successNotify(data.message);
				})
				.catch(handleError);
		},
		[addAddEmailTemplateTrigger, successNotify, handleError]
	);

	return {
		addEmailTemplateToUser,
		isEmailTemplateAdding
	};
};

export default useAddEmailTemplate;
