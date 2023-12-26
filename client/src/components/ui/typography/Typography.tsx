import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './typography.module.css';
import { TTypographyProps } from '@/components';

const variantTags = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	button: 'span',
	caption: 'span'
};

const Typography: FC<TTypographyProps> = ({
	variant = 'body1',
	text,
	weight = 'regular',
	classes = '',
	noWrap,
	lightColor,
	textAlign = 'left',
	children,
	uppercase = false
}) => {
	const typographyClassNames = classNames({
		[styles.typography]: true,
		[styles[variant]]: variant,
		[styles[weight]]: weight,
		[styles[textAlign]]: textAlign,
		[styles.noWrap]: noWrap,
		[styles.lightColor]: lightColor,
		[styles.uppercase]: uppercase
	});

	const props = { className: `${typographyClassNames} ${classes}` };

	return React.createElement(
		variantTags[variant] || 'p',
		props,
		text || children
	);
};

export default Typography;
