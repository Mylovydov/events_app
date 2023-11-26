import styles from './switch.module.css';
import { ChangeEvent, FC, memo } from 'react';
import { TSwitchProps } from '@/components';

const Switch: FC<TSwitchProps> = memo(
	({ checked, id = 'switch', onChange, ...rest }) => {
		const onHandleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
			onChange && onChange(target.checked);

		return (
			<div className={styles.switch}>
				<input
					className={styles.switchInput}
					checked={checked}
					onChange={onHandleChange}
					type="checkbox"
					id={id}
					{...rest}
				/>
				<label className={styles.switchLabel} htmlFor={id} />
			</div>
		);
	}
);

export default Switch;
