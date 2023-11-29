import styles from './button.module.css';
import { TButtonProps, Typography } from '@/components';
import { FC } from 'react';
import classNames from 'classnames';

const Button: FC<TButtonProps> = ({
	label,
	type = 'submit',
	disabled,
	fullWidth,
	variant = 'filled',
	...rest
}) => {
	const btmClasses = classNames({
		[styles.button]: true,
		[styles.fullWidth]: fullWidth,
		[styles[variant]]: variant
	});

	return (
		<button className={btmClasses} type={type} disabled={disabled} {...rest}>
			<Typography variant="button" weight="bold" text={label} />
		</button>
	);
};

export default Button;
