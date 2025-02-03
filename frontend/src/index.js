import React from 'react';
import ReactDOM from 'react-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{
      "client-id": "ASLY6CzEzwvTXOJs6_ozYGHnz5RxL83gOiQiollolBnWLR_ET00cb2aquzIVzqiiXqigiiq7SQ8eMhV_",
      currency: "USD"
    }}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
