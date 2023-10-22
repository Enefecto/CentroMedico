import React from 'react';
import { Navigate } from 'react-router-dom';

const NoLogeado = ({ element, authenticated }) => {
  return authenticated ? (
    <Navigate to="/inicio" replace />
  ) : (
    element
  );
};

export default NoLogeado;
