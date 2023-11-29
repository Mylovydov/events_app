import { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { TAppRouter } from '../../../../server/src/types/shared.types';

export type TCreateUserInput = inferProcedureInput<
	TAppRouter['users']['create']
>;
export type TCreateUserOutput = inferProcedureOutput<
	TAppRouter['users']['create']
>;

export type TGetUserInput = inferProcedureInput<TAppRouter['users']['getUser']>;
export type TGetUserOutput = inferProcedureOutput<
	TAppRouter['users']['getUser']
>;

export type TGetUsersInput = inferProcedureInput<
	TAppRouter['users']['getUsers']
>;
export type TGetUsersOutput = inferProcedureOutput<
	TAppRouter['users']['getUsers']
>;

export type TUpdateUserInput = inferProcedureInput<
	TAppRouter['users']['update']
>;
export type TUpdateUserOutput = inferProcedureOutput<
	TAppRouter['users']['update']
>;

export type TDeleteUserInput = inferProcedureInput<
	TAppRouter['users']['delete']
>;
export type TDeleteUserOutput = inferProcedureOutput<
	TAppRouter['users']['delete']
>;

export type TAddEmailTemplateByUserIdInput = inferProcedureInput<
	TAppRouter['users']['addEmailTemplateByUserId']
>;
export type TAddEmailTemplateByUserIdOutput = inferProcedureOutput<
	TAppRouter['users']['addEmailTemplateByUserId']
>;

export type TUser = TGetUserOutput['data'];
