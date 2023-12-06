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
import { EApiTags, wrapMetadataInPromise } from '@/utils';
import { trpcClient } from '@/trpc';

export const usersApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		createUser: builder.mutation<TCreateUserOutput, TCreateUserInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.users.create.mutate,
					requestArgs: arg
				})
		}),

		getUser: builder.query<TGetUserOutput, TGetUserInput['userId']>({
			query: userId =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.users.getUser.query,
					requestArgs: { userId }
				}),
			providesTags: (_, __, userId) => [{ type: EApiTags.USERS, id: userId }]
		}),

		getUsers: builder.query<TGetUsersOutput, TGetUsersInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.users.getUsers.query,
					requestArgs: arg
				}),
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
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.users.update.mutate,
					requestArgs: arg
				}),
			invalidatesTags: [EApiTags.USERS]
		}),

		deleteUser: builder.mutation<TDeleteUserOutput, TDeleteUserInput>({
			query: arg =>
				wrapMetadataInPromise({
					originalRequest: trpcClient.users.delete.mutate,
					requestArgs: arg
				}),
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
