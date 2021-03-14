import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const CurrencyContext = createContext({
  currency: [],
  setCurrency: () => {},
  isLoading: false,
});

export const CurrencyProvider = (props) => {
  const [currency, setCurrency] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getCurrency = async () => {
      const { data } = await axios.get("http://localhost:5000/data");
      const currencyData = data[0];
      currencyData.rates.push({
        currency: "Polski złoty",
        code: "PLN",
        mid: 1.0,
      });
      // Filter out special drawing rights code
      setCurrency(
        currencyData.rates.filter((element) => element.code !== "XDR")
      );
    };
    getCurrency().then((_) => setLoading(false));
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, isLoading }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContext;
