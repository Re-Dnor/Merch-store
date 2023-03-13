import { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "app/store";

export const withProviders = (app: () => ReactElement) => () => {
  return (
    <BrowserRouter>
      <Provider store={store}>{app()}</Provider>
    </BrowserRouter>
  );
};
