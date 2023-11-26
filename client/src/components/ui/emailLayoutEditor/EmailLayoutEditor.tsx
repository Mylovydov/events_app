import EmailEditor from 'react-email-editor';
import { forwardRef } from 'react';
import { EditorRef } from 'react-email-editor/dist/types';
import { TEmailLayoutEditorProps } from '@/components';

const EmailLayoutEditor = forwardRef<EditorRef, TEmailLayoutEditorProps>(
	(props, ref) => {
		return <EmailEditor ref={ref} {...props} />;
	}
);

EmailEditor.displayName = 'EmailLayoutEditor';

export default EmailLayoutEditor;
