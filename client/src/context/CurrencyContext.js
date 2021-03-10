import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyContext = createContext({ currency: 0, setCurrency: () => {} });

export const CurrencyProvider = (props) => {
  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    const getCurrency = async () => {
      const  {data}  = await axios.get('http://localhost:5000/data');
      data[0].rates.push({code : 'PLN', mid: 1.00});
      setCurrency(data[0].rates.filter((element) => element.code !== "XDR"));
    };
    getCurrency();
  }, []);

  return (
   <CurrencyContext.Provider value={{ currency, setCurrency }}>
     {props.children}
   </CurrencyContext.Provider>
  );
};

export default CurrencyContext;