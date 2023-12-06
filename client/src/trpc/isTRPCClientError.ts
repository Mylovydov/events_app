import { TRPCClientError } from '@trpc/client';
import type { TAppRouter } from '../../../server/src/types/shared.types';

const isTRPCClientError = (
	cause: unknown
): cause is TRPCClientError<TAppRouter> => {
	return cause instanceof TRPCClientError;
};

export default isTRPCClientError;
