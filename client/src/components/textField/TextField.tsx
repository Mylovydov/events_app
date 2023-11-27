import { FC } from 'react';
import { ErrorMessage, Input, InputLabel, TTextFieldProps } from '@/components';
import styles from './textField.module.css';

const TextField: FC<TTextFieldProps> = ({
	labelProps,
	errorMessageProps,
	name,
	...inputProps
}) => {
	return (
		<div className={styles.textField}>
			<div className={styles.textFieldBody}>
				{labelProps && (
					<InputLabel
						{...{ ...labelProps, htmlFor: name, disabled: inputProps.disabled }}
					/>
				)}
				<Input {...{ ...inputProps, name, id: name }} />
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
