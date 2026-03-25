import { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";
import axios from "axios";

function BuyActionWindow({ uid, price }) {
  const { closeBuyWindow } = useContext(GeneralContext);

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [product, setProduct] = useState("CNC"); 

  useEffect(() => {
    if (price !== undefined) {
      setStockPrice(price);
    }
  }, [price]);

  const handleBuyClick = async () => {
    try {
      // userId get
      const stored = JSON.parse(localStorage.getItem("user"));
      const userId = stored?.user?._id || stored?._id;

      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
        product: product,   
        userId: userId      
      });

    } catch (err) {
      console.error("Error placing order", err);
    } finally {
      closeBuyWindow();
      window.location.reload();
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  const total = stockQuantity * (stockPrice || 0);

  return (
    <div className="containerClass" id="buy-window">
      <div className="regular-order">

        <div style={{ marginBottom: "10px" }}>
          <label>Product: </label>
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option value="CNC">CNC (Delivery)</option>
            <option value="MIS">MIS (Intraday)</option>
          </select>
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
            <input
              type="number"
              value={stockPrice}
              readOnly
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Total ₹{total}</span>

        <div>
          <button className="btn btn-blue me-4" onClick={handleBuyClick}>
            Buy
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyActionWindow;