import styles from './avatar.module.css';
import { FC } from 'react';
import classNames from 'classnames';
import { TAvatarProps } from '@/components/ui/avatar/avatar.types.ts';

const Avatar: FC<TAvatarProps> = ({ src, alt, size = 'medium' }) => {
	const avatarClassNames = classNames({
		[styles.avatar]: true,
		[styles.avatarColored]: !src,
		[styles[size]]: size
	});

	const imgMarkup = src ? (
		<img className={styles.avatarImg} src={src} alt={alt} />
	) : (
		'JD'
	);

	return <div className={avatarClassNames}>{imgMarkup}</div>;
};

export default Avatar;
