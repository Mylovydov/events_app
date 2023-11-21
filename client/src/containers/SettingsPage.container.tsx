import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorPicker, Switch } from '@/components';
import { SettingsPage } from '@/pages';
import { useAddAppSettings, useUserContext } from '@/hooks';
import { isStringType } from '@/utils';

const SettingsPageContainer = () => {
	const { user, isUserLoading } = useUserContext();

	const [color, setColor] = useState<string>('#ebe8ff');
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
			setColor(user.appSettings.highlightColor || '#ebe8ff');
			setIsAutoSendEnabled(user.appSettings.isAutoSendEnabled);
		}
	}, [user]);

	return (
		<SettingsPage
			title="Settings"
			subtitle="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
			items={settingsItems}
			isPageLoading={isUserLoading}
			onSave={onAddAppSettings || isAppSettingsAdding}
		/>
	);
};

export default SettingsPageContainer;
