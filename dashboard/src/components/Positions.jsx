import { useEffect, useState } from "react";
import axios from "axios";

function Positions() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = () => {
    axios
      .get("http://localhost:3002/allPositions")
      .then((res) => setPositions(res.data));
  };

  const handleSell = async (stock) => {
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: stock.name,
        qty: stock.qty,
        price: stock.price,
        mode: "SELL",
        product: "MIS"
      });

      fetchPositions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <h3>Positions ({positions.length})</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty</th>
            <th>Avg</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {positions.map((stock, index) => {
            const investment = stock.price * stock.qty;

            const pnl = investment * 0.05;

            return (
              <tr key={index}>
                <td>MIS</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>

                <td className="profit">
                  {pnl.toFixed(2)}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleSell(stock)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Positions;