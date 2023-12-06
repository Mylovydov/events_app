import { TextField, TTextFieldProps } from '@/components';
import { forwardRef, useState } from 'react';

export type TPasswordFieldProps = Omit<TTextFieldProps, 'ref'>;

const PasswordField = forwardRef<HTMLInputElement, TPasswordFieldProps>(
	(props, ref) => {
		const [isShowPassword, setIsShowPassword] = useState(false);

		return (
			<TextField
				type={isShowPassword ? 'text' : 'password'}
				icon={isShowPassword ? 'eye-slash' : 'eye'}
				onIconClick={() => setIsShowPassword(prev => !prev)}
				ref={ref}
				{...props}
			/>
		);
	}
);

export default PasswordField;
