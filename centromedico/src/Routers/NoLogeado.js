import React from 'react';
import { Navigate } from 'react-router-dom';

const NoLogeado = ({ element, authenticated }) => {
  return authenticated ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

export default NoLogeado;
