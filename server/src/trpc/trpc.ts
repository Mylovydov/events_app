import { initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { TContext } from './context.js';

export const t = initTRPC.context<TContext>().meta<OpenApiMeta>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
