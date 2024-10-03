import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import BulletItems from "./BulletItems.jsx"
import SingleView from './SingleView.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "",
//         element: <BulletItems />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<BulletItems />} />
      <Route path='/:bulletItemId' element={<SingleView />} />
    </Route>
  )

)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <App /> */}
    <RouterProvider router={router} />
  </Provider>,
)
