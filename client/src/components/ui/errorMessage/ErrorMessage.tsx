import { TErrorMessageProps, Typography } from '@/components';
import { FC } from 'react';
import styles from './errorMessage.module.css';

const ErrorMessage: FC<TErrorMessageProps> = ({ message }) =>
	message && (
		<span className={styles.errorMessage}>
			<Typography text={message} variant="subtitle2" weight="semi" />
		</span>
	);

export default ErrorMessage;
