import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

import { useLoginStatus } from './context/LoginStatusContext';

function Router() {
  const { isLoggedIn } = useLoginStatus();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to={'home'} /> : <Login />}
        errorElement={<ErrorPage />}
      >
        <Route
          path="home"
          element={isLoggedIn ? <App /> : <Navigate to={'/'} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default Router;
//  {
//       path: '/',
//       element:{isLoggedIn ? <Login /> : <Navigate to={'/dashboard'} />},
//       errorElement: <ErrorPage />,
//     },
//     {
//       path: 'dashboard',
//       element: <App />,
//       errorElement: <ErrorPage />,
//     },
//   ]);
