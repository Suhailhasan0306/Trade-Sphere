import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

function Holdings() {
  const [allHoldings, setAllHoldings] = useState([]);
  const [graphData, setGraphData] = useState(null);

  const { openSellWindow } = useContext(GeneralContext);

  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);

      const labels = res.data.map((item) => item.name);
      const data = {
        labels,
        datasets: [
          {
            label: "Stock Price",
            data: res.data.map((item) => item.price * item.qty * 1.05), 
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };
      setGraphData(data);
    });
  }, []);

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );

  const currentValue = totalInvestment * 1.05;

  const pnl = totalInvestment * 0.05;
  const pnlPercent = 5;

  const pnlClass = "profit"; 

  return (
    <div className="container-fluid">
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const investment = stock.avg * stock.qty;

              const currvalue = investment * 1.05;
              const pnlValue = investment * 0.05;

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>

                  <td>{currvalue.toFixed(2)}</td>

                  <td className="profit">
                    {pnlValue.toFixed(2)}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        openSellWindow(stock.name, stock.price, "CNC")
                      }
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

      <div className="row mt-4 text-center">
        <div className="col-md-4 col-12">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col-md-4 col-12 mt-3 mt-md-0">
          <h5>₹{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col-md-4 col-12 mt-3 mt-md-0">
          <h5 className={pnlClass}>
            ₹{pnl.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&amp;L</p>
        </div>
      </div>

      {graphData && (
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              height: "250px",
              width: "100%",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              border: "1px solid #eee",
            }}
          >
            <VerticalGraph data={graphData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Holdings;







