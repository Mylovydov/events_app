import styles from './navList.module.css';
import { NavItem } from '@/components/navbar/components';
import { FC } from 'react';
import { TNavListProps } from '@/components/navbar/components/navLIst/navList.types.ts';

const NavList: FC<TNavListProps> = ({ items }) => (
	<ul className={styles.navList}>
		{items.map(item => (
			<NavItem key={item.to} {...item} />
		))}
	</ul>
);

export default NavList;
