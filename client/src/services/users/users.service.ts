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
import { trpcClient } from '@/trpc';

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg => trpcClient.users.create.mutate(arg)
		}),

		getUser: builder.query<TGetUserOutput, TGetUserInput['userId']>({
			query: userId => trpcClient.users.getUser.query({ userId }),
			providesTags: (_, __, userId) => [{ type: EApiTags.USERS, id: userId }]
		}),

		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg => trpcClient.users.getUsers.query(arg),
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
			invalidatesTags: [EApiTags.USERS]
		}),

		deleteUser: builder.mutation<TDeleteUserOutput, TDeleteUserInput>({
			query: arg => trpcClient.users.delete.mutate(arg),
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
