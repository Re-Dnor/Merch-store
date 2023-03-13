import { Suspense } from "react";
import { Spinner } from "@alfalab/core-components/spinner";
import Routing from "../pages";
import { ErrorBoundary, Page } from "widgets";
import { withProviders } from "./providers";
import "./styles/index.scss";

function App() {
  return (
    <ErrorBoundary>
      <Page>
        <Suspense fallback={<Spinner size="m" visible />}>
          <Routing />
        </Suspense>
      </Page>
    </ErrorBoundary>
  );
}

export default withProviders(App);
