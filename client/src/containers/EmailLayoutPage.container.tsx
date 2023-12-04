import { EmailLayoutPage } from '@/pages';
import { useCallback, useRef, useState } from 'react';
import { EditorRef, EmailEditorProps } from 'react-email-editor/dist/types';
import { useAddEmailTemplate, useAppSelector } from '@/hooks';
import { isStringType } from '@/utils';
import { getUserSelector } from '@/slices';

const editorOptions: EmailEditorProps['options'] = {
	mergeTags: {
		inviteeFirstName: {
			name: 'first name',
			value: '{{inviteeFirstName}}'
		},
		inviteeLastName: {
			name: 'last name',
			value: '{{inviteeLastName}}'
		},
		startDateTime: {
			name: 'start time',
			value: '{{startDateTime}}'
		},
		endDateTime: {
			name: 'end time',
			value: '{{endDateTime}}'
		},
		location: {
			name: 'location',
			value: '{{location}}'
		}
	},
	displayMode: 'email'
};

const EmailLayoutPageContainer = () => {
	const { user, isAppUserLoading } = useAppSelector(getUserSelector);
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
		isAppUserLoading || isEmailTemplateAdding || isEditorLoading;

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
