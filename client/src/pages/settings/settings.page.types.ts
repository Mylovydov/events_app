import { TAppSettingsProps, TPageHeaderProps } from '@/components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { TSettingsFormValues } from '@/containers';

export type TSettingsPageProps = TPageHeaderProps &
	TAppSettingsProps & {
		isPageLoading?: boolean;
		disableSaveButton?: boolean;
		onSubmit: SubmitHandler<TSettingsFormValues>;
		methods: UseFormReturn<TSettingsFormValues>;
	};
