import { Link } from 'react-router-dom';
import Container from './Container';

export default function ErrorPage() {
  return (
    <Container>
      <div className="flex flex-col gap-1">
        <h1>App is down for Maintenance</h1>
        <div>
          click{' '}
          <Link to="/" className="text-blue-800">
            Here
          </Link>{' '}
          to return Home{' '}
        </div>
      </div>
    </Container>
  );
}
