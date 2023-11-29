import { EmailLayoutPage } from '@/pages';
import { useCallback, useRef, useState } from 'react';
import { EditorRef, EmailEditorProps } from 'react-email-editor/dist/types';
import { useAddEmailTemplate, useUserContext } from '@/hooks';
import { isStringType } from '@/utils';

const editorOptions: EmailEditorProps['options'] = {
	mergeTags: {
		inviteeLastName: {
			name: 'Invitee Last Name',
			value: '{{inviteeLastName}}'
		},
		inviteeFirstName: {
			name: 'Invitee First Name',
			value: '{{inviteeFirstName}}'
		}
	},
	displayMode: 'email'
};

const EmailLayoutPageContainer = () => {
	const { user, isUserLoading } = useUserContext();
	const { addEmailTemplateToUser, isEmailTemplateAdding } =
		useAddEmailTemplate();
	const [isEditorLoading, setIsEditorLoading] = useState(true);
	const emailEditorRef = useRef<EditorRef>(null);

	const onAddEmailTemplate = useCallback(() => {
		if (!(emailEditorRef.current?.editor && user?._id)) {
			return;
		}

		emailEditorRef.current.editor.exportHtml(data => {
			const { html, design } = data;
			console.log('html', { html, design });
			addEmailTemplateToUser({
				userId: user._id,
				template: html,
				design: JSON.stringify(design)
			});
		});
	}, [addEmailTemplateToUser, user]);

	const onLoad = () => {
		if (!(emailEditorRef.current?.editor && user?.emailTemplate)) {
			return;
		}

		if (!isStringType(user.emailTemplate)) {
			const templateJson = JSON.parse(user.emailTemplate.design);
			emailEditorRef.current.editor.loadDesign(templateJson);
		}
	};

	const onReady = () => {
		setIsEditorLoading(false);
	};

	const isPageLoading =
		isUserLoading || isEmailTemplateAdding || isEditorLoading;

	return (
		<EmailLayoutPage
			title="Email Layout"
			onLoad={onLoad}
			onReady={onReady}
			editorRef={emailEditorRef}
			onLayoutSave={onAddEmailTemplate}
			options={editorOptions}
			isPageLoading={isPageLoading}
		/>
	);
};

export default EmailLayoutPageContainer;
