import { PropsWithChildren } from 'react';

export type TSettingsItemProps = {
	title: string;
	subtitle?: string;
} & PropsWithChildren;
