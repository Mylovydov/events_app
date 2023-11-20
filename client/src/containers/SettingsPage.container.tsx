import { useMemo, useState } from 'react';
import { ColorPicker } from '@/components';
import { SettingsPage } from '@/pages';

const SettingsPageContainer = () => {
	const [color, setColor] = useState('#000000');

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
		/>
	);
};

export default SettingsPageContainer;
