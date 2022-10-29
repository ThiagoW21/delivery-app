import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from '../components/main';

function RoutesComp() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default RoutesComp;
