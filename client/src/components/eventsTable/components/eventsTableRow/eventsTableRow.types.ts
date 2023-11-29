import { TEvent } from '@/services';
import { TTableColumn } from '@/components';

export type TEventUnionKeys = keyof TEvent;
export type TEventValue = TEvent[TEventUnionKeys];
export type TEventKeys = TEventUnionKeys[];

export type TEventsTableRowProps = {
	columns: TTableColumn[];
	item: TEvent;
	actionBtnLabel: string;
	onSendButtonClick: (eventId: string) => void;
	highlightColor: string | undefined;
};
