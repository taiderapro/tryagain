// Exemplo: src/pages/errorBoundary/ErrorBoundary.tsx
import React from 'react';
import '../styles/index.scss'; // importe os estilos

const ErrorBoundary = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className="errorboundary">
      <div className="errorboundary__status">Oops!</div>
      <p>{error.message}</p>
      <button className="errorboundary__btn" onClick={resetErrorBoundary}>
        Tentar Novamente
      </button>
    </div>
  );
};

export default ErrorBoundary;
