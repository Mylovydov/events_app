import { TAppSettingsProps, TPageHeaderProps } from '@/components';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { TSettingsFormValues } from '@/containers';

export type TSettingsPageProps = TPageHeaderProps &
	TAppSettingsProps & {
		isPageLoading?: boolean;
		onSubmit: SubmitHandler<TSettingsFormValues>;
		onReset: () => void;
		methods: UseFormReturn<TSettingsFormValues>;
		isBtnDisabled?: boolean;
	};
