import { NavList } from '@/components/navbar/components';
import { FC } from 'react';
import { TNavbarProps } from '@/components/navbar/navbar.types.ts';
import styles from './navbar.module.css';

const Navbar: FC<TNavbarProps> = ({ items = [] }) => (
	<nav className={styles.navbar}>
		<NavList items={items} />
	</nav>
);

export default Navbar;
