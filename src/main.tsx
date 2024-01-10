import React from "react"
import ReactDOM from "react-dom/client"
import { Provider, useSelector } from "react-redux"
import { store, persistor, RootState } from "./app/store"
import { PersistGate } from "redux-persist/integration/react"

import {
  createBrowserRouter,
  RouterProvider,
  RouteProps,
  Navigate,
} from "react-router-dom"

import Home from "./pages/Home"
import List from "./pages/List"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/List",
    element: <List />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
