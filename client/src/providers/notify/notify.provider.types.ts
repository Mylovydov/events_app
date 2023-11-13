import { SharedProps } from 'notistack';

export type IOpenNotifyParams = {
	key?: string;
	message: string;
} & SharedProps;

export type TNotifyContext = {
	open: (params: IOpenNotifyParams) => void;
	close: (key: string) => void;
};
