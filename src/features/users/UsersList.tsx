import { Link } from 'react-router';
import { useUsers } from '../../hooks/queries/useUsers';
import type { JSX } from 'react';

export const UsersList = (): JSX.Element => {
  const { data, isLoading, error } = useUsers();

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Unable to load users.</p>;
  }

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  );
};
