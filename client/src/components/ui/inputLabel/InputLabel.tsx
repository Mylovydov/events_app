import styles from './inputLabel.module.css';
import { FC } from 'react';
import { TInputLabelProps } from '@/components/ui/inputLabel/inputLabel.types.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components';

const InputLabel: FC<TInputLabelProps> = ({ label, required, ...props }) => {
	return (
		<label className={styles.inputLabel} {...props}>
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
