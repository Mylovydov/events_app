import { TBaseSortDirection, TEventUnionKeys } from '@/components';

export const accessTokenName = 'eventAppToken';

export enum EApiTags {
	USERS = 'Users',
	EVENTS = 'Events',
	EMAIL_SETTINGS = 'EmailSettings',
	LIST = 'List'
}

export const SORT_DIRECTION_PARAM_KEY = 'direction';
export const SORT_KEY_PARAM_KEY = 'key';
export const PAGE_PARAM_KEY = 'page';

export const defaultDirection: TBaseSortDirection = 'desc';
export const defaultSortKey: TEventUnionKeys = 'startDateTime';

export const defaultHighlightColor = '#ebe8ff';

export const requiredFieldMessage = 'This field is required!';

export const settingsPage = {
	pageTitle: 'Settings',
	pageSubtitle: 'Change the settings of your application',
	settingsItems: {
		highlight: {
			title: 'Event Highlighting Color',
			subtitle:
				'Select the color that will be used to highlight unsent messages'
		},
		smtp: {
			title: 'Specify the SMTP server settings',
			subtitle:
				'Once verified, automatic invitations will be available when events are uploaded'
		},
		autosend: {
			title: 'Automatic sending of emails',
			subtitle: 'Enable/disable automatic messaging when events are downloaded'
		}
	}
};

export const emailLayoutPage = {
	pageTitle: 'Email Layout'
};

export const eventsPage = {
	pageTitle: 'Events',
	emptyLabel: 'No events found'
};

export const uploadPage = {
	pageTitle: 'Events Upload',
	pageSubtitle: 'Upload your events in csv format',
	dragRejectText: 'File type not accepted, sorry!',
	dragAcceptText: 'File type accepted, nice!',
	dragPlaceholder: 'Drag and drop some files here, or click to select files'
};
