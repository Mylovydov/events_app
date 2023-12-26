import styles from './emailLayout.page.module.css';
import {
	Button,
	EmailLayoutEditor,
	PageHeader,
	TEmailLayoutEditorProps,
	TPageHeaderProps
} from '@/components';
import { FC, MutableRefObject } from 'react';
import { EditorRef } from 'react-email-editor/dist/types';

export type TEmailLayoutPageProps = TPageHeaderProps &
	TEmailLayoutEditorProps & {
		editorRef: MutableRefObject<EditorRef | null>;
		isPageLoading?: boolean;
		onLayoutSave?: () => void;
	};

const EmailLayoutPage: FC<TEmailLayoutPageProps> = ({
	title,
	subtitle,
	isPageLoading,
	onLayoutSave,
	editorRef,
	...editorProps
}) => {
	return (
		<section className={styles.emailLayoutPage}>
			<div className={styles.emailLayoutPageHeader}>
				<PageHeader title={title} subtitle={subtitle} />
			</div>
			<div className={styles.emailLayoutPageBody}>
				<EmailLayoutEditor {...editorProps} ref={editorRef} />
			</div>
			<div className={styles.emailLayoutPageFooter}>
				<Button
					onClick={onLayoutSave}
					disabled={isPageLoading}
					label="Save layout"
				/>
			</div>
		</section>
	);
};

export default EmailLayoutPage;
