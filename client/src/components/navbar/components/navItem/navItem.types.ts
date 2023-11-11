import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type TNavItemProps = {
	to: string;
	icon?: IconProp;
	label: string;
	onItemClick?: () => void;
	isLink?: boolean;
};
