import { TEvent } from '@/services';
import { TTableColumn } from '@/components/baseTable/baseTable.types.ts';

export type TEventUnionKeys = keyof TEvent;
export type TEventValue = TEvent[TEventUnionKeys];
export type TEventKeys = TEventUnionKeys[];

export type TEventsTableRowProps = {
	columns: TTableColumn[];
	item: TEvent;
	actionBtnLabel: string;
};
