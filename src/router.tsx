import { createBrowserRouter } from 'react-router-dom';
import { routes } from './config/routes';

const router = createBrowserRouter([
  ...routes,
  {
    path: 'about',
    element: <div>About</div>,
  },
]);

export default router;
