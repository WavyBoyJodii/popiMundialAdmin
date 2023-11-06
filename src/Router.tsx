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
import Dashboard from './components/Dashboard';
import { useLoginStatus } from './context/LoginStatusContext';

function Router() {
  const { state } = useLoginStatus();
  console.log(state.isLoggedIn);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route
          index={true}
          element={
            state.isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} />
          }
        />
        <Route
          path="/login"
          element={state.isLoggedIn ? <Navigate to={'/'} /> : <Login />}
        ></Route>
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
