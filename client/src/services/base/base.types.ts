import { TRegisterOutput } from '@/services';

export type TErrorResponse = {
	code: string;
	message: string;
	status: number;
	zodError: string | null;
};

export type TSuccessResponse = {
	message: string;
	data: unknown;
};

export type TAuthOutput = TRegisterOutput['data'];
