"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class StarWarsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-[50vh] w-full items-center justify-center"
          style={{ minHeight: "500px" }}
        >
          <div className="text-center text-white/80">
            <p className="mb-2 text-lg font-medium">3D section unavailable</p>
            <Link
              href="/interactive"
              className="text-cyan-400 underline hover:no-underline"
            >
              Go to Interactive →
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
