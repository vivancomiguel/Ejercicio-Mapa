import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Mapa from './components/Mapa';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Mapa/>
  </React.StrictMode>
);
