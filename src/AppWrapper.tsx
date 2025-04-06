import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { RouterProvider } from 'react-router';
import router from "./router";
import { RouterProvider } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default AppWrapper;
