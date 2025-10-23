import { ReactNode } from "react";

export class ErrorBoundry {
  render(fallback: ReactNode) {
    return fallback;
  }
}
