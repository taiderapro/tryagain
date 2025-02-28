import React from 'react';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default BaseLayout;
