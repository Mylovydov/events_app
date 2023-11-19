import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PropsWithChildren } from 'react';

export type TEmptyTableProps = {
	icon?: IconProp;
	iconSize?: number | string;
} & PropsWithChildren;
