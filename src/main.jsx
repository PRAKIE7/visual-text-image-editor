import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './Components/Imports.js'
import { SignupPg, AddPostPg, EditPostPg, AllPostPg, HomePg, PostPermit } from './Pages/ImportPages.js'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePg />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authenticate={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authenticate={false}>
            <SignupPg />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authenticate>
            <AllPostPg />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authenticate>
            <AddPostPg />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authenticate>
            {" "}
            <EditPostPg />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <PostPermit />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store} >
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
)