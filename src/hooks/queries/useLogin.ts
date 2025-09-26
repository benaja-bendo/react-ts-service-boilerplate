import { useMutation } from '@tanstack/react-query';
import { useServices } from '../../lib/services.context';
import { useAuthStore } from '../../stores/auth.store';

export const useLogin = () => {
  const { authService } = useServices();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authService.login.bind(authService),
    onSuccess: (result) => {
      if (!result.ok) {
        return;
      }

      setSession(result.data);
    },
  });
};
