import { FC } from 'react';
import styles from './navbar.module.css';
import { NavList, TNavbarProps } from '@/components';

const Navbar: FC<TNavbarProps> = ({ items = [] }) => (
	<nav className={styles.navbar}>
		<NavList items={items} />
	</nav>
);

export default Navbar;
