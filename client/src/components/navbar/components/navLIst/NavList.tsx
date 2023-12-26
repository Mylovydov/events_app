import styles from './navList.module.css';
import { FC } from 'react';
import { NavItem, TNavListProps } from '@/components';

const NavList: FC<TNavListProps> = ({ items }) => (
	<ul className={styles.navList}>
		{items.map(item => (
			<NavItem key={item.to} {...item} />
		))}
	</ul>
);

export default NavList;
