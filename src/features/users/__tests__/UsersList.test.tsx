import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { UsersList } from '../UsersList';
import { renderWithRouter } from '../../../test/test-utils';
import { mockUsers } from '../../../test/handlers';
import { server } from '../../../test/server';

describe('UsersList', () => {
  it('renders the fetched users as navigable links', async () => {
    renderWithRouter([
      {
        path: '/',
        element: <UsersList />,
      },
    ]);

    expect(screen.getByText(/Loading users/i)).toBeInTheDocument();

    const firstUser = await screen.findByRole('link', { name: mockUsers[0].name });
    const secondUser = await screen.findByRole('link', { name: mockUsers[1].name });

    expect(firstUser).toHaveAttribute('href', `/users/${mockUsers[0].id}`);
    expect(secondUser).toHaveAttribute('href', `/users/${mockUsers[1].id}`);
  });

  it('shows an error message when the request fails', async () => {
    server.use(
      http.get('*/users', () => HttpResponse.json({ message: 'error' }, { status: 500 })),
    );

    renderWithRouter([
      {
        path: '/',
        element: <UsersList />,
      },
    ]);

    const error = await screen.findByText(/Unable to load users/i);
    expect(error).toBeInTheDocument();
  });
});
