import { FC } from 'react';
import { TVerifiedCheckmarkProps, Typography } from '@/components';
import styles from './verifiedCheckmark.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const VerifiedCheckmark: FC<TVerifiedCheckmarkProps> = ({
	label,
	isVerified
}) => {
	const checkMarkClasses = classNames({
		[styles.verifiedCheckmark]: true,
		[styles.isVerified]: isVerified
	});

	const icon: IconProp = isVerified ? 'circle-check' : 'circle-xmark';

	return (
		<div className={checkMarkClasses}>
			<div className={styles.verifiedCheckmarkIcon}>
				<FontAwesomeIcon icon={icon} />
			</div>
			<div className={styles.verifiedCheckmarkContent}>
				<Typography text={label} weight="bold" noWrap />
			</div>
		</div>
	);
};

export default VerifiedCheckmark;
