import { TNavItemProps } from '@/components';

export type TSidebarProps = {
	navList: TNavItemProps[];
	logoutLabel: string;
	onLogoutClick: () => void;
};
