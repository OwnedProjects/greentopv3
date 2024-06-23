import Dashboard from '../app/dashboard/Dashboard';

export type AppRoutes = {
  path: string;
  element: JSX.Element;
};

export const routes: AppRoutes[] = [
  {
    path: '/',
    element: <Dashboard />,
  },
];
