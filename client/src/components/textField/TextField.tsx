import { forwardRef } from 'react';
import { ErrorMessage, Input, InputLabel, TTextFieldProps } from '@/components';
import styles from './textField.module.css';

const TextField = forwardRef<HTMLInputElement, TTextFieldProps>(
	({ labelProps, errorMessageProps, name, ...inputProps }, ref) => {
		return (
			<div className={styles.textField}>
				<div className={styles.textFieldBody}>
					{labelProps?.label && (
						<InputLabel
							{...{
								...labelProps,
								htmlFor: name,
								disabled: inputProps.disabled
							}}
						/>
					)}
					<Input {...{ ...inputProps, name, id: name, ref }} />
				</div>
				{errorMessageProps?.message && (
					<div className={styles.textFieldFooter}>
						<ErrorMessage {...errorMessageProps} />
					</div>
				)}
			</div>
		);
	}
);

export default TextField;
