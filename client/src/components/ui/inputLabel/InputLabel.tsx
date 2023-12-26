import styles from './inputLabel.module.css';
import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TInputLabelProps, Typography } from '@/components';
import classNames from 'classnames';

const InputLabel: FC<TInputLabelProps> = ({
	label,
	required,
	disabled,
	...props
}) => {
	const labelClasses = classNames({
		[styles.inputLabel]: true,
		[styles.disabled]: disabled
	});
	return (
		<label className={labelClasses} {...props}>
			<div className={styles.inputLabelContent}>
				<Typography variant="subtitle1" weight="semi" text={label} />
			</div>

			{required && (
				<span className={styles.inputLabelIcon}>
					<FontAwesomeIcon icon="star-of-life" />
				</span>
			)}
		</label>
	);
};

export default InputLabel;
