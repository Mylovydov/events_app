import React, { FC, PropsWithChildren } from 'react';

export type TCellProps = {
	className?: string;
	isHead?: boolean;
	onClick?: () => void;
} & PropsWithChildren;

const Cell: FC<TCellProps> = ({ children, isHead = true, ...props }) => {
	const tag = isHead ? 'th' : 'td';
	return React.createElement(tag, props, children);
};

export default Cell;
