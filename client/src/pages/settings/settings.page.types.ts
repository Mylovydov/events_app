import { TAppSettingsProps, TPageHeaderProps } from '@/components';
import { UseFormReturn } from 'react-hook-form';
import { TSettingsFormValues } from '@/containers';

export type TSettingsPageProps = TPageHeaderProps &
	TAppSettingsProps & {
		isPageLoading?: boolean;
		disableSaveButton?: boolean;
		onSave?: () => void;
		methods?: UseFormReturn<TSettingsFormValues>;
	};
