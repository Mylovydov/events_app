import { TRegisterOutput } from '@/services';
import { Resolver } from '@trpc/client';

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

export type TBaseQueryArgs = {
	originalRequest: Resolver<any>;
	requestArgs: unknown;
};

export type TBaseQueryPromisedArgs = Promise<TBaseQueryArgs>;
