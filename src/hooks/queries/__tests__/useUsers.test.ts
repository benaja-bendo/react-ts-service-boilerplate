import { http, HttpResponse } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUsers } from '../useUsers';
import { createHookWrapper } from '../../../test/test-utils';
import { mockUsers } from '../../../test/handlers';
import { server } from '../../../test/server';

describe('useUsers', () => {
  it('fetches and returns the users list', async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: createHookWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockUsers);
  });

  it('exposes an error state when the request fails', async () => {
    server.use(
      http.get('*/users', () => HttpResponse.json({ message: 'error' }, { status: 500 })),
    );

    const { result } = renderHook(() => useUsers(), {
      wrapper: createHookWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
