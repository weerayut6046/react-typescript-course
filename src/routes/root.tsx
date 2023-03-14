import { createBrowserRouter } from 'react-router-dom';
import AboutPage from '../pages/about-page';
import HomePage from '../pages/home-page';
import LoginPage from '../pages/login-page';
import routeDashboard from './dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  ...routeDashboard,
]);

export default router;
