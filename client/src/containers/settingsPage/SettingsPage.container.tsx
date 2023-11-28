import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorPicker, EmailSettingsForm, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import {
	useAddAppSettings,
	useAddEmailSettings,
	useUserContext
} from '@/hooks';
import { isStringType } from '@/utils';
import { Controller, useForm } from 'react-hook-form';
import {
	TAppSettings,
	TEmailSettings,
	TSettingsFormValues
} from '@/containers';

const SettingsPageContainer = () => {
	const { addAppSettings, isAppSettingsAdding } = useAddAppSettings();
	const { addEmailSettings, isEmailSettingsAdding } = useAddEmailSettings();
	const { user, isUserLoading } = useUserContext();

	const [appSettings, setAppSettings] = useState<TAppSettings>({
		color: '',
		isAutoSendEnabled: false
	});
	const [userEmailSettings, setUserEmailSettings] = useState<TEmailSettings>({
		service: '',
		password: '',
		user: ''
	});

	const methods = useForm<TSettingsFormValues>({
		values: {
			color: appSettings.color,
			isAutoSendEnabled: appSettings.isAutoSendEnabled,
			service: userEmailSettings.service,
			password: userEmailSettings.password,
			user: userEmailSettings.user
		}
	});

	const onAddAppSettings = useCallback(
		(data: TSettingsFormValues) => {
			if (!user?._id) {
				return;
			}

			const { color, isAutoSendEnabled, ...emailSettings } = data;

			addAppSettings({
				userId: user._id,
				highlightColor: color,
				isAutoSendEnabled
			});

			addEmailSettings({
				userId: user._id,
				...emailSettings
			});
		},
		[addAppSettings, addEmailSettings, user]
	);

	useEffect(() => {
		if (!user) {
			return;
		}

		const { appSettings, emailSettings } = user;

		if (!isStringType(appSettings)) {
			setAppSettings({
				...appSettings,
				color: appSettings.highlightColor || ''
			});
		}

		if (!isStringType(emailSettings)) {
			const { pass = '', user = '', service = '' } = emailSettings;
			setUserEmailSettings({
				password: pass,
				user,
				service
			});
		}
	}, [user]);

	// const isAppSettingsChanged = useMemo(() => {
	// 	if (!user) {
	// 		return false;
	// 	}
	//
	// 	if (!isStringType(user.appSettings)) {
	// 		return (
	// 			user.appSettings.highlightColor !== color ||
	// 			user.appSettings.isAutoSendEnabled !== isAutoSendEnabled
	// 		);
	// 	}
	//
	// 	return false;
	// }, [color, isAutoSendEnabled, user]);

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
			disableSaveButton={false}
			isPageLoading={isPageLoading}
			onSubmit={onAddAppSettings}
			methods={methods}
		/>
	);
};

export default SettingsPageContainer;
