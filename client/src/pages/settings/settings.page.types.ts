import { TAppSettingsProps, TPageHeaderProps } from '@/components';

export type TSettingsPageProps = TPageHeaderProps &
	TAppSettingsProps & {
		isPageLoading?: boolean;
	};
