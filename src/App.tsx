import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import { loader as getUserData } from "./pages/Root";
import { loader as getCartProductsData } from "./pages/Cart";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: getUserData,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          loader: getCartProductsData,
          element: <Cart />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
