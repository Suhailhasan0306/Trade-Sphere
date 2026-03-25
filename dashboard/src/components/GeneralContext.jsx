import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, product) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid, price, product) => {}, 
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {

  const [isBuyWindowOpen, setIsBuyWindow] = useState(false);
  const [selectStock, setSelectStock] = useState(null);

  const [isSellWindowOpen, setIsSellWindow] = useState(false);
  const [selectSellStock, setSelectSellStock] = useState(null);

  // ✅ BUY OPEN
  const handleOpenBuyWindow = (uid, price, product) => {
    console.log("OPEN BUY WINDOW", uid, price, product);

    setIsSellWindow(false);
    setSelectSellStock(null); 

    setIsBuyWindow(true);
    setSelectStock({ uid, price, product });
  };

  // ✅ SELL OPEN
  const handleOpenSellWindow = (uid, price, product) => {
    console.log("OPEN SELL WINDOW", uid, price, product);

    setIsBuyWindow(false);
    setSelectStock(null);

    setIsSellWindow(true);
    setSelectSellStock({ uid, price, product });
  };

  // ✅ CLOSE BUY
  const handleCloseBuyWindow = () => {
    setIsBuyWindow(false);
    setSelectStock(null);
  };

  // ✅ CLOSE SELL
  const handleCloseSellWindow = () => {
    setIsSellWindow(false);
    setSelectSellStock(null);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,   
        closeSellWindow: handleCloseSellWindow  
      }}
    >
      {props.children}

      {isBuyWindowOpen && selectStock && (
        <BuyActionWindow
          uid={selectStock.uid}
          price={selectStock.price}
          product={selectStock.product} 
        />
      )}

      {isSellWindowOpen && selectSellStock && (
        <SellActionWindow
          uid={selectSellStock.uid}
          price={selectSellStock.price}
          product={selectSellStock.product} 
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;


