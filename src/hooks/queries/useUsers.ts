import { useQuery } from '@tanstack/react-query';
import { useServices } from '../../lib/services.context';

export const useUsers = () => {
  const { userService } = useServices();

  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  });
};
