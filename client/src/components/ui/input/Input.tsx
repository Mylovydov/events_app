import styles from './input.module.css';
import { forwardRef } from 'react';
import classNames from 'classnames';
import { TInputProps } from '@/components';

const TextField = forwardRef<HTMLInputElement, TInputProps>(
	({ className, fullWidth, hasError, ...props }, ref) => {
		const inputClassName = classNames({
			[styles.input]: true,
			[styles.hasError]: hasError,
			[className as string]: !!className,
			[styles.fullWidth]: fullWidth
		});
		return <input className={inputClassName} {...props} ref={ref} />;
	}
);

export default TextField;
