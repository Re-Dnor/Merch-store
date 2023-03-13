import { lazy } from "react";

const HomePage = lazy(() => import("pages/home"));
const MadeInAlfaPage = lazy(() => import("pages/made-in-alfa"));
const YourDesignPage = lazy(() => import("pages/your-design"));
const ContactsPage = lazy(() => import("pages/contacts"));
const BasketPage = lazy(() => import("pages/basket"));
const ProductPage = lazy(() => import("pages/product"));
const NotFoundPage = lazy(() => import("pages/not-found"));

export const RoutingPaths = [
  {
    path: "/",
    element: <HomePage />,
    name: "home",
  },
  {
    path: "/made-in-alfa",
    element: <MadeInAlfaPage />,
    name: "madeInAlfa",
  },
  {
    path: "/your-design",
    element: <YourDesignPage />,
    name: "yourDesign",
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
    name: "contacts",
  },
  {
    path: "/basket",
    element: <BasketPage />,
    name: "basket",
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
    name: "product",
  },
  {
    path: "*",
    element: <NotFoundPage />,
    name: "notFound",
  },
];
