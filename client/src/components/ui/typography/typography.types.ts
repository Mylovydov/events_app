import { PropsWithChildren, ReactNode } from 'react';

export type TTypographyProps = {
	variant?:
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'subtitle1'
		| 'subtitle2'
		| 'body1'
		| 'body2'
		| 'caption'
		| 'button';
	weight?: 'regular' | 'medium' | 'semi' | 'bold';
	text?: string | ReactNode;
	classes?: string;
	noWrap?: boolean;
	lightColor?: boolean;
	textAlign?: 'left' | 'center' | 'right';
	uppercase?: boolean;
} & PropsWithChildren;
