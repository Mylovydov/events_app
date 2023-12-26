import styles from './logout.module.css';
import { FC } from 'react';
import { NavItem } from '@/components';

export type TLogoutProps = {
	label: string;
	onClick: () => void;
};

const Logout: FC<TLogoutProps> = ({ label, onClick }) => (
	<div className={styles.logout}>
		<NavItem
			label={label}
			onItemClick={onClick}
			to="logout"
			icon="arrow-right-from-bracket"
			isLink={false}
		/>
	</div>
);

export default Logout;
