import { EmailLayoutPage } from '@/pages';
import { useRef, useState } from 'react';
import { EditorRef, EmailEditorProps } from 'react-email-editor/dist/types';

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
	}
};

const EmailLayoutPageContainer = () => {
	const [isEditorLoading, setIsEditorLoading] = useState(true);
	const emailEditorRef = useRef<EditorRef>(null);

	const exportHtml = () => {
		if (!emailEditorRef.current?.editor) {
			return;
		}

		emailEditorRef.current.editor.exportHtml(data => {
			const { html } = data;
			console.log('exportHtml', html);
		});
	};

	const onLoad = () => {
		// editor instance is created
		// you can load your template here;
		// const templateJson = {};
		// emailEditorRef.current.editor.loadDesign(templateJson);
		console.log('onLoad');
	};

	const onReady = () => {
		console.log('onReady');
		setIsEditorLoading(false);
	};

	return (
		<EmailLayoutPage
			title="Email Layout"
			onLoad={onLoad}
			onReady={onReady}
			editorRef={emailEditorRef}
			onLayoutSave={exportHtml}
			options={editorOptions}
			isPageLoading={isEditorLoading}
		/>
	);
};

export default EmailLayoutPageContainer;
