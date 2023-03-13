import { Spinner } from "@alfalab/core-components/spinner";
import { render } from "@testing-library/react";
import { store } from "app/store";
import { BuyProduct } from "features/buy-product/buy-product";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";

import { ProductList } from "../product-list";

export const renderComponents = ({ initialEntry }: { initialEntry: string }) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/made-in-alfa" element={<ProductList />} />
            <Route path="/products/:id" element={<BuyProduct />} />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </Provider>
  );
