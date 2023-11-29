import styles from './input.module.css';
import { forwardRef } from 'react';
import classNames from 'classnames';
import { TInputProps } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TextField = forwardRef<HTMLInputElement, TInputProps>(
	({ className, fullWidth, hasError, icon, onIconClick, ...props }, ref) => {
		const inputClassName = classNames({
			[styles.input]: true,
			[styles.hasError]: hasError,
			[className as string]: !!className,
			[styles.fullWidth]: fullWidth
		});
		return (
			<div className={styles.inputWrapper}>
				<input className={inputClassName} {...props} ref={ref} />
				{icon && (
					<span className={styles.inputIcon} onClick={onIconClick}>
						<FontAwesomeIcon icon={icon} />
					</span>
				)}
			</div>
		);
	}
);

export default TextField;
