import { useEffect, useState } from "react";
import axios from "axios";

function Summary() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const totalInvestment = holdings.reduce((acc, stock) => {
    return acc + stock.avg * stock.qty;
  }, 0);

  const currentValue = totalInvestment * 1.05;

  const pnl = totalInvestment * 0.05;
  const percent = 5;

  const pnlClass = "profit"; 

  return (
    <div className="summary">
      <div className="username">
        <h6>Hi, User</h6>
        <hr className="divider" />
      </div>

      <div className="equity-section">
        <h5>Equity</h5>
        <div className="equity-data">
          <div className="first">
            <h3>₹4540</h3>
            <p>Margin available</p>
          </div>
          <div className="second">
            <p>Margins used <span>₹0</span></p>
            <p>Opening balance <span>₹4540</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="holdings-section">
        <h5>Holdings ({holdings.length})</h5>

        <div className="equity-data">
          <div className="first">
            <h3 className={pnlClass}>
              ₹{pnl.toFixed(2)}
              <small> ({percent}%)</small>
            </h3>
            <p>P&amp;L</p>
          </div>

          <div className="second">
            <p>
              Current Value <span>₹{currentValue.toFixed(2)}</span>
            </p>
            <p>
              Investment <span>₹{totalInvestment.toFixed(2)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </div>
  );
}

export default Summary;