import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorPicker, EmailSettingsForm, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import { useAddAppSettings, useUserContext } from '@/hooks';
import { defaultHighlightColor, isStringType } from '@/utils';
import { useForm } from 'react-hook-form';
import { TEmailSettings, TSettingsFormValues } from '@/containers';

const SettingsPageContainer = () => {
	const { user, isUserLoading } = useUserContext();

	const [color, setColor] = useState<string>(defaultHighlightColor);
	const [isAutoSendEnabled, setIsAutoSendEnabled] = useState<boolean>(false);
	const [userEmailSettings, setUserEmailSettings] = useState<
		TEmailSettings | undefined
	>({
		service: '',
		password: '',
		user: ''
	});

	const { addAppSettings, isAppSettingsAdding } = useAddAppSettings();

	const methods = useForm<TSettingsFormValues>({
		values: {
			color,
			isAutoSendEnabled,
			service: userEmailSettings?.service || '',
			password: userEmailSettings?.password || '',
			user: userEmailSettings?.user || ''
		}
	});

	const onAddAppSettings = useCallback(() => {
		if (!user?._id) {
			return;
		}

		addAppSettings({
			userId: user._id,
			highlightColor: color,
			isAutoSendEnabled
		});
	}, [addAppSettings, color, isAutoSendEnabled, user]);

	const onIsAutoSendEnabledChange = useCallback(
		(isChecked: boolean) => setIsAutoSendEnabled(isChecked),
		[]
	);

	useEffect(() => {
		if (!user) {
			return;
		}

		if (!isStringType(user.appSettings)) {
			setColor(user.appSettings.highlightColor || defaultHighlightColor);
			setIsAutoSendEnabled(user.appSettings.isAutoSendEnabled);
		}

		if (user.emailSettings && !isStringType(user.emailSettings)) {
			const { _id, pass, ...emailSettings } = user.emailSettings;
			setUserEmailSettings({ ...emailSettings, password: pass });
		}
	}, [user]);

	const isAppSettingsChanged = useMemo(() => {
		if (!user) {
			return false;
		}

		if (!isStringType(user.appSettings)) {
			return (
				user.appSettings.highlightColor !== color ||
				user.appSettings.isAutoSendEnabled !== isAutoSendEnabled
			);
		}

		return false;
	}, [color, isAutoSendEnabled, user]);

	const settingsItems = useMemo(
		() => [
			{
				title: 'Event Highlighting Color',
				subtitle:
					'Select the color that will be used to highlight unsent messages',
				children: <ColorPicker color={color} onChange={setColor} />
			},
			{
				title: 'Automatic sending of emails',
				subtitle:
					'Enable/disable automatic messaging when events are downloaded',
				children: (
					<Switch
						checked={isAutoSendEnabled}
						onChange={onIsAutoSendEnabledChange}
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
		[color, isAutoSendEnabled, onIsAutoSendEnabledChange]
	);

	return (
		<SettingsPage
			title="Settings"
			subtitle="Change the settings of your application"
			items={settingsItems}
			disableSaveButton={!isAppSettingsChanged}
			isPageLoading={isUserLoading || isAppSettingsAdding}
			onSave={onAddAppSettings}
			methods={methods}
		/>
	);
};

export default SettingsPageContainer;
