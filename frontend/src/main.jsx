import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/Style/style.css";
import store from './Redux/Store/store.js';
import { Provider } from 'react-redux';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
