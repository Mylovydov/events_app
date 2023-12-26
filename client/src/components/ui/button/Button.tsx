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
	size = 'large',
	...rest
}) => {
	const btmClasses = classNames({
		[styles.button]: true,
		[styles.fullWidth]: fullWidth,
		[styles[variant]]: variant,
		[styles[size]]: size
	});

	const typographyVariant = size === 'medium' ? 'caption' : 'button';

	return (
		<button className={btmClasses} type={type} disabled={disabled} {...rest}>
			<Typography variant={typographyVariant} weight="bold" text={label} />
		</button>
	);
};

export default Button;
