import { FC } from 'react';
import { ErrorMessage, Input, InputLabel, TTextFieldProps } from '@/components';
import styles from './textField.module.css';

const TextField: FC<TTextFieldProps> = ({
	labelProps,
	errorMessageProps,
	...inputProps
}) => {
	return (
		<div className={styles.textField}>
			<div className={styles.textFieldBody}>
				{labelProps && <InputLabel {...labelProps} />}
				<Input {...inputProps} />
			</div>
			{errorMessageProps && (
				<div className={styles.textFieldFooter}>
					<ErrorMessage {...errorMessageProps} />
				</div>
			)}
		</div>
	);
};

export default TextField;
