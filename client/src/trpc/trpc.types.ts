import type { TAppRouter } from '../../../server/src/types/shared.types';
import { TRPCClientError } from '@trpc/client';
import { inferRouterOutputs } from '@trpc/server';

export type TTRPCClientError = TRPCClientError<TAppRouter>;
export type TTRPCClientResult = inferRouterOutputs<TAppRouter>;
