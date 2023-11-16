import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@/components';
import styles from './navItem.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { TNavItemProps } from '@/components/navbar/components/navItem/navItem.types.ts';

const NavItem: FC<TNavItemProps> = ({
	to,
	icon,
	label,
	onItemClick,
	isLink = true
}) => {
	const iconMarkup = icon && (
		<div className={styles.navIcon}>
			<FontAwesomeIcon icon={icon} fontSize="2rem" />
		</div>
	);

	const labelMarkup = (
		<div className={styles.navLabel}>
			<Typography text={label} weight="bold" />
		</div>
	);

	return isLink ? (
		<NavLink
			to={to}
			onClick={onItemClick}
			className={({ isActive }) =>
				classNames({
					[styles.navItem]: true,
					[styles.navItemActive]: isActive
				})
			}
		>
			{iconMarkup}
			{labelMarkup}
		</NavLink>
	) : (
		<div className={styles.navItem} onClick={onItemClick}>
			{iconMarkup}
			{labelMarkup}
		</div>
	);
};

export default NavItem;
