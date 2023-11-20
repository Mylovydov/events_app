import { useEffect, useMemo, useState } from 'react';
import { ColorPicker } from '@/components';
import { SettingsPage } from '@/pages';
import { useUserContext } from '@/hooks';
import { isStringType } from '@/utils';

const SettingsPageContainer = () => {
	const { user, isUserLoading } = useUserContext();

	const [color, setColor] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!user) {
			return;
		}

		if (!isStringType(user.appSettings)) {
			setColor(user.appSettings.highlightColor || '#000');
		}
	}, [user]);

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
				children: <ColorPicker color={color} onChange={setColor} />
			}
		],
		[color]
	);

	return (
		<SettingsPage
			title="Settings"
			subtitle="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum "
			items={settingsItems}
			isPageLoading={isUserLoading}
		/>
	);
};

export default SettingsPageContainer;
