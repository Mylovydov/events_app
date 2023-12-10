import { AppLayout } from '@/layouts';
import { TNavItemProps } from '@/components';
import {
	EMAIL_LAYOUT_PATH,
	EVENTS_PATH,
	HOME_PATH,
	SETTINGS_PATH
} from '@/routes';

const navList: TNavItemProps[] = [
	{ label: 'Home', to: HOME_PATH, icon: 'house' },
	{ label: 'Events', to: EVENTS_PATH, icon: 'calendar-days' },
	{ label: 'Settings', to: SETTINGS_PATH, icon: 'gear' },
	{ label: 'Layout', to: EMAIL_LAYOUT_PATH, icon: 'rectangle-list' }
];

const AppLayoutContainer = () => {
	return (
		<AppLayout navList={navList} username="User" onLogoutClick={() => {}} />
	);
};

export default AppLayoutContainer;
