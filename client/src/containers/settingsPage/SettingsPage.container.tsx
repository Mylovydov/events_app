import { useCallback, useMemo } from 'react';
import { ColorPicker, EmailSettingsForm, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import {
	useAddAppSettings,
	useAddEmailSettings,
	useUserContext
} from '@/hooks';
import { getFormValues } from '@/utils';
import { Controller, useForm } from 'react-hook-form';
import { TSettingsFormValues } from '@/containers';

const SettingsPageContainer = () => {
	const { addAppSettings, isAppSettingsAdding } = useAddAppSettings();
	const { addEmailSettings, isEmailSettingsAdding } = useAddEmailSettings();
	const { user, isUserLoading } = useUserContext();

	const methods = useForm<TSettingsFormValues>({
		values: getFormValues(user)
	});

	const onChangeSettings = useCallback(
		(data: TSettingsFormValues) => {
			if (!user) {
				return;
			}

			const { _id: userId } = user;
			const { color, isAutoSendEnabled, ...emailSettings } = data;

			addAppSettings({
				userId,
				highlightColor: color,
				isAutoSendEnabled
			});

			addEmailSettings({
				userId,
				...emailSettings
			});
		},
		[addAppSettings, addEmailSettings, user]
	);

	const settingsItems = useMemo(
		() => [
			{
				title: 'Event Highlighting Color',
				subtitle:
					'Select the color that will be used to highlight unsent messages',
				children: (
					<Controller
						name="color"
						control={methods.control}
						render={({ field: { value, onChange } }) => (
							<ColorPicker color={value} onChange={onChange} />
						)}
					/>
				)
			},
			{
				title: 'Automatic sending of emails',
				subtitle:
					'Enable/disable automatic messaging when events are downloaded',
				children: (
					<Controller
						name="isAutoSendEnabled"
						control={methods.control}
						render={({ field: { value, onChange } }) => (
							<Switch checked={value} onChange={onChange} />
						)}
					/>
				)
			},
			{
				title: 'Automatic sending of emails',
				subtitle:
					'Enable/disable automatic messaging when events are downloaded',
				children: <EmailSettingsForm />
			}
		],
		[methods.control]
	);

	const isPageLoading =
		isUserLoading || isAppSettingsAdding || isEmailSettingsAdding;
	return (
		<SettingsPage
			title="Settings"
			subtitle="Change the settings of your application"
			items={settingsItems}
			isPageLoading={isPageLoading}
			onSubmit={onChangeSettings}
			methods={methods}
		/>
	);
};

export default SettingsPageContainer;
