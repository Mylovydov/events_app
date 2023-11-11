import styles from './logout.module.css';
import { NavItem } from '@/components/navbar/components';
import { FC } from 'react';

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
