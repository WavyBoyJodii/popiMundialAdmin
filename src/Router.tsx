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
import Home from './components/Home';
import Editor from './components/Editor';
import NewBlogger from './components/NewBlogger';
import PostPage from './components/PostPage';
import { useLoginStatus } from './hooks/useLoginStatus';
import EditPost from './components/EditPost';

function Router() {
  const { state } = useLoginStatus();
  console.log(state.isLoggedIn);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route
          element={
            state.isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} />
          }
        >
          <Route index={true} element={<Home />} errorElement={<ErrorPage />} />
          <Route
            path="/newPost"
            element={<Editor />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/newBlogger"
            element={<NewBlogger />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/post/:postId"
            element={<PostPage />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/edit/:postId"
            element={<EditPost />}
            errorElement={<ErrorPage />}
          />
        </Route>
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
