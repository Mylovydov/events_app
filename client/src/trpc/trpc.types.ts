import type { TAppRouter } from '../../../server/src/types/shared.types';
import { TRPCClientError } from '@trpc/client';

export type TTRPCClientError = TRPCClientError<TAppRouter>;
