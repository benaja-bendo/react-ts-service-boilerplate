import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/queries/useUser';

export const UserDetails = (): JSX.Element => {
  const params = useParams();
  const paramId = params.userId ?? params.id;
  const userId = paramId ? Number.parseInt(paramId, 10) : undefined;

  const { data, isLoading, error } = useUser(userId);

  if (!userId) {
    return <p>Select a user to view the details.</p>;
  }

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  if (error) {
    return <p>Unable to load the user.</p>;
  }

  if (!data) {
    return <p>User not found.</p>;
  }

  return (
    <article>
      <h2>{data.name}</h2>
      <dl>
        <dt>Username</dt>
        <dd>{data.username}</dd>
        <dt>Email</dt>
        <dd>{data.email}</dd>
      </dl>
    </article>
  );
};
