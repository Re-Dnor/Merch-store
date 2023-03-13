import { Header, Footer, GoingHome } from "entities";
import { Component, ErrorInfo } from "react";
import { Col } from "shared/ui";

import { Props, State } from "./types";
import styles from "./styles.module.scss";

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Col className={styles.errorBoundary}>
            <GoingHome />
          </Col>
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}
