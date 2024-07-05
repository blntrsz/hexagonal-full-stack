import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from './pages/home';
import { homeLoader } from './pages/home/loader';
import { taskLoader } from './pages/task/loader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './index.css'
import { Layout } from './components/layout';
import { TaskPage } from './pages/task';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader(queryClient)
      },
      {
        path: "/:id",
        element: <TaskPage />,
        loader: taskLoader(queryClient)
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
