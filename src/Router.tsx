import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'dashboard',
      element: <App />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
