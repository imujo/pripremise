import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  '../src/Sass/main.css'
import {FrontendContextProvider} from './State/FrontendState'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { BackendContextProvider } from './State/BackendState';


ReactDOM.render(
  <React.StrictMode>
    <FrontendContextProvider>
      <BackendContextProvider>
        <App />
      </BackendContextProvider>
    </FrontendContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
