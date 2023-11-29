import { trpcClient } from '@/trpc';
import {
	baseApi,
	TCreateUserInput,
	TCreateUserOutput,
	TDeleteUserInput,
	TDeleteUserOutput,
	TGetUserInput,
	TGetUserOutput,
	TGetUsersInput,
	TGetUsersOutput,
	TUpdateUserInput,
	TUpdateUserOutput
} from '@/services';
import { EApiTags } from '@/utils';

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg => trpcClient.users.create.mutate(arg)
		}),

		getUser: builder.query<TGetUserOutput, TGetUserInput>({
			query: arg => trpcClient.users.getUser.query(arg),
			transformErrorResponse: ({ data }) => data,
			providesTags: (_, __, { userId }) => [
				{ type: EApiTags.USERS, id: userId }
			]
		}),

		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg => trpcClient.users.getUsers.query(arg),
			transformErrorResponse: ({ data }) => data,
			providesTags: result => {
				if (!result) {
					return [EApiTags.USERS];
				}
				return result.data.map(({ _id }) => ({
					type: EApiTags.USERS,
					id: _id
				}));
			}
		}),

		updateUser: builder.mutation<TUpdateUserOutput, TUpdateUserInput>({
			query: arg => trpcClient.users.update.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.USERS]
		}),

		deleteUser: builder.mutation<TDeleteUserOutput, TDeleteUserInput>({
			query: arg => trpcClient.users.delete.mutate(arg),
			transformErrorResponse: ({ data }) => data,
			invalidatesTags: [EApiTags.USERS]
		})
	})
});

export const {
	useCreateUserMutation,
	useGetUserQuery,
	useGetUsersQuery,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApi;
