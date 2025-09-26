import { useQuery } from '@tanstack/react-query';
import { useServices } from '../../lib/services.context';

export const useUser = (userId?: number) => {
  const { userService } = useServices();

  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error('userId is required');
      }

      return userService.getUserById(userId);
    },
    enabled: typeof userId === 'number',
  });
};
