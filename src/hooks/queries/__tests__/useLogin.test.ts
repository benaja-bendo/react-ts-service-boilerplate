import { http, HttpResponse } from 'msw';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLogin } from '../useLogin';
import { createHookWrapper } from '../../../test/test-utils';
import { mockSession, validCredentials } from '../../../test/handlers';
import { server } from '../../../test/server';
import { useAuthStore } from '../../../stores/auth.store';

describe('useLogin', () => {
  it('stores the session when the credentials are valid', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createHookWrapper(),
    });

    expect(useAuthStore.getState().session).toBeNull();

    await act(async () => {
      await result.current.mutateAsync(validCredentials);
    });

    expect(useAuthStore.getState().session).toEqual(mockSession);
  });

  it('keeps the session empty when the request fails', async () => {
    server.use(
      http.post('*/login', () => HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })),
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createHookWrapper(),
    });

    await act(async () => {
      const failure = await result.current.mutateAsync({
        email: 'user@example.com',
        password: 'wrong',
      });

      expect(failure.ok).toBe(false);
    });

    expect(useAuthStore.getState().session).toBeNull();
  });
});
