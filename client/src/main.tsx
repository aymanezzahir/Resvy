import "./index.css";



import Home from "./pages/home";
import Notfond from "./pages/notfound"

import {
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
  RouterProvider,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";


const theRouter = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="*" element={<Notfond />} />
      </Route>
    </>
  )
);
// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (

    <HelmetProvider>
        <RouterProvider router={theRouter} />
    </HelmetProvider>

  );
}
const root = createRoot(document.getElementById("root")!);

// Render your component using the root
root.render(<App />);