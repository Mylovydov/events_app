import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorPicker, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import { useAddAppSettings, useUserContext } from '@/hooks';
import { defaultHighlightColor, isStringType } from '@/utils';

const SettingsPageContainer = () => {
	const { user, isUserLoading } = useUserContext();

	const [color, setColor] = useState<string>(defaultHighlightColor);
	const [isAutoSendEnabled, setIsAutoSendEnabled] = useState<boolean>(false);

	const { addAppSettings, isAppSettingsAdding } = useAddAppSettings();

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
			}
		],
		[color, isAutoSendEnabled, onIsAutoSendEnabledChange]
	);

	useEffect(() => {
		if (!user) {
			return;
		}

		if (!isStringType(user.appSettings)) {
			setColor(user.appSettings.highlightColor || defaultHighlightColor);
			setIsAutoSendEnabled(user.appSettings.isAutoSendEnabled);
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

	return (
		<SettingsPage
			title="Settings"
			subtitle="Change the settings of your application"
			items={settingsItems}
			disableSaveButton={!isAppSettingsChanged}
			isPageLoading={isUserLoading || isAppSettingsAdding}
			onSave={onAddAppSettings}
		/>
	);
};

export default SettingsPageContainer;
