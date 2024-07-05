import { createBrowserRouter } from 'react-router-dom';
import { routes } from './config/routes';
import { homeRoutes } from './config/routes/homeRoutes';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Use Layout as the root element
    children: [...routes, ...homeRoutes],
  },
]);

export default router;
