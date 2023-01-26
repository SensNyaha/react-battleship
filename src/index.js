import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './components/Game/Game';
import { BrowserRouter } from "react-router-dom";

import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Game/>
    </BrowserRouter>
  </React.StrictMode>
);
