import React from 'react';
import './index.css';
import HomePage from "./views/HomePage";
import {CurrencyProvider} from "./context/CurrencyContext";
const App = () => {
  return (
   <CurrencyProvider>
     <HomePage/>
   </CurrencyProvider>
  );
}
export default App;