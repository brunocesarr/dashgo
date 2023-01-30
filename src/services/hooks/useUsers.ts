import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { api } from '../api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type GeUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(
  currentPage: number = 1,
): Promise<GeUsersResponse> {
  try {
    const { data, headers } = await api.get('users', {
      params: {
        page: currentPage,
      },
    });
    const totalCountUsers = Number(headers['x-total-count']);
    const users: User[] = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });

    return {
      users,
      totalCount: totalCountUsers,
    };
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
}
export function useUsers(
  currentPage: number = 1,
  options: UseQueryOptions<GeUsersResponse> = null,
) {
  return useQuery({
    queryKey: ['users', currentPage],
    queryFn: () => getUsers(currentPage),
    staleTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
