'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-foret flex items-center justify-center p-4">
          <div className="text-center text-creme">
            <h2 className="text-4xl font-bold mb-4 font-display">
              Oups ! Quelque chose s&apos;est mal passé
            </h2>
            <p className="text-xl mb-8 max-w-md mx-auto">
              Une erreur technique est survenue. Veuillez rafraîchir la page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-ocre text-white font-bold rounded-lg text-lg transition-transform duration-300 hover:scale-105"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;