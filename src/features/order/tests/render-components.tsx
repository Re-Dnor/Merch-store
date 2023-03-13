import { Spinner } from "@alfalab/core-components/spinner";
import { render } from "@testing-library/react";
import { store } from "app/store";
import { BuyProduct } from "features/buy-product/buy-product";

import { Suspense } from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router";
import { Page } from "widgets";
import { Order } from "../oder";

export const renderComponents = ({ initialEntry }: { initialEntry: string }) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/basket" element={<Order />} />
            <Route
              path="/products/:id"
              element={
                <Page>
                  <BuyProduct />
                </Page>
              }
            />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </Provider>
  );
