import React, { PropsWithChildren } from 'react';

export enum ESortDirection {
	ASC = 'asc',
	DESC = 'desc'
}

export type TSortDirection = 'asc' | 'desc' | false;

export type TSortableCellProps = {
	active?: boolean;
	direction?: TSortDirection;
	onClick?: (e: React.MouseEventHandler<HTMLSpanElement>) => void;
} & PropsWithChildren;
