import styles from './avatar.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { TAvatarProps } from '@/components/ui/avatar/avatar.types.ts';

const Avatar: FC<TAvatarProps> = ({ src, alt, size = 'medium', name }) => {
	const avatarClassNames = classNames({
		[styles.avatar]: true,
		[styles.avatarColored]: !src,
		[styles[size]]: size
	});

	const imgMarkup = src && (
		<img className={styles.avatarImg} src={src} alt={alt} />
	);

	const nameMarkup =
		name &&
		name
			.split(' ')
			.map(word => word.charAt(0).toUpperCase())
			.join('');

	return (
		<div className={avatarClassNames}>{imgMarkup || nameMarkup || 'JD'}</div>
	);
};

export default Avatar;
