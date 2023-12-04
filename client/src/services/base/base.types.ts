import { TRegisterOutput } from '@/services';

export type TErrorResponse = {
	code: string;
	message: string;
	status: number;
	zodError: string | null;
};

export type TSuccessResponse<Data = unknown> = {
	message: string;
	data: Data;
};

export type TAuthOutput = TRegisterOutput['data'];
