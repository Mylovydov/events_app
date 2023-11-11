import { TNavItemProps } from '@/components/navbar/components/navItem/navItem.types.ts';

export type TSidebarProps = {
	navList: TNavItemProps[];
	logoutLabel: string;
	onLogoutClick: () => void;
};
