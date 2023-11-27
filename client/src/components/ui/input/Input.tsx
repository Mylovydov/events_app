import styles from './input.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { TInputProps } from '@/components';

const TextField: FC<TInputProps> = ({
	className,
	fullWidth,
	hasError,
	...props
}) => {
	const inputClassName = classNames({
		[styles.input]: true,
		[styles.hasError]: hasError,
		[className as string]: !!className,
		[styles.fullWidth]: fullWidth
	});
	return <input className={inputClassName} {...props} />;
};

export default TextField;
