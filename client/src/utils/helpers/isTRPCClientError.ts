import { TTRPCClientError } from '@/trpc';
import { TRPCClientError } from '@trpc/client';

const isTRPCClientError = (cause: unknown): cause is TTRPCClientError => {
	return cause instanceof TRPCClientError;
};
export default isTRPCClientError;
