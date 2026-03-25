import { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import axios from "axios";

function SellActionWindow({ uid, price, product }) { 

  const { closeSellWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  useEffect(() => {
    if (price !== undefined) {
      setStockPrice(price);
    }
  }, [price]);

  const handleSellClick = async () => {
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
        product: product 
      });

      closeSellWindow();
      window.location.reload(); 

    } catch (err) {
      console.error(err);
    }
  };

  const total = stockQuantity * (stockPrice || 0);

  return (
    <div className="containerClass">
      <div className="regular-order">

        {/* ✅ Product show */}
        <div style={{ marginBottom: "10px" }}>
          <b>Product:</b>
          <span className="badge bg-secondary ms-2">
            {product}
          </span>
        </div>

        <div className="inputs">

          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input type="number" value={stockPrice} readOnly />
          </fieldset>

        </div>
      </div>

      <div className="buttons">
        <span>Total ₹{total}</span>

        <div>
          <button className="btn btn-danger me-4" onClick={handleSellClick}>
            SELL
          </button>

          <button className="btn btn-grey" onClick={closeSellWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellActionWindow;