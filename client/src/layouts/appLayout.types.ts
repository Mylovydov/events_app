import { TNavItemProps } from '@/components';

export type TAppLayoutProps = {
	logoutLabel?: string;
	onLogoutClick: () => void;
	username?: string;
	navList: TNavItemProps[];
};
