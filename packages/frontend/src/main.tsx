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
import { homeAction } from './pages/home/action';
import { taskAction } from './pages/task/action';
import { UsersPage } from './pages/users';
import { AuditPage } from './pages/audit';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: homeLoader(queryClient),
        action: homeAction(queryClient)
      },
      {
        path: "/:id",
        element: <TaskPage />,
        loader: taskLoader(queryClient),
        action: taskAction(queryClient)
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/audit",
        element: <AuditPage />,
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
