import { useCallback, useMemo } from 'react';
import { ColorPicker, EmailSettingsForm, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import {
	useAddAppSettings,
	useAddEmailSettings,
	useAppSelector,
	useResetSettings
} from '@/hooks';
import { getFormValues } from '@/utils';
import { Controller, useForm } from 'react-hook-form';
import { TSettingsFormValues } from '@/containers';
import { getUserSelector } from '@/slices';

const SettingsPageContainer = () => {
	const { addAppSettings, isAppSettingsAdding } = useAddAppSettings();
	const { addEmailSettings, isEmailSettingsAdding } = useAddEmailSettings();
	const { resetSettings, isSettingsResetting } = useResetSettings();

	const { user, isAppUserLoading } = useAppSelector(getUserSelector);

	const onSettingsReset = () => {
		if (!user) {
			return;
		}

		const { _id: userId } = user;
		resetSettings({ userId });
	};

	const methods = useForm<TSettingsFormValues>({
		values: getFormValues(user)
	});

	const { isSettingsVerified } = methods.getValues();

	const onChangeSettings = useCallback(
		(data: TSettingsFormValues) => {
			if (!user) {
				return;
			}

			const { _id: userId } = user;

			const {
				highlightColor,
				isAutoSendEnabled,
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				isSettingsVerified,
				...emailSettings
			} = data;

			addAppSettings({
				userId,
				highlightColor,
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
						name="highlightColor"
						control={methods.control}
						render={({ field: { value, onChange } }) => (
							<ColorPicker color={value} onChange={onChange} />
						)}
					/>
				)
			},
			{
				title: 'Specify the SMTP server settings',
				subtitle:
					'Once verified, automatic invitations will be available when events are uploaded',
				children: <EmailSettingsForm />
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
							<Switch
								checked={value}
								onChange={onChange}
								disabled={!isSettingsVerified}
							/>
						)}
					/>
				)
			}
		],
		[isSettingsVerified, methods.control]
	);

	const isSendBtnDisabled =
		isAppSettingsAdding || isEmailSettingsAdding || isSettingsResetting;

	return (
		<SettingsPage
			title="Settings"
			subtitle="Change the settings of your application"
			items={settingsItems}
			isPageLoading={isAppUserLoading}
			isBtnDisabled={isSendBtnDisabled}
			onReset={onSettingsReset}
			onSubmit={onChangeSettings}
			methods={methods}
		/>
	);
};

export default SettingsPageContainer;
