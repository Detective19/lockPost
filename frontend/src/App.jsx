import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/reviews")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const filteredData = data.filter((item) => {
    if (filter === "all") return true;

    if (filter === "partial")
      return item.match === "partial";

    if (filter === "low")
      return item.confidence < 0.7;

    return true;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Order Fulfillment Review</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("partial")}>
          Partial
        </button>

        <button onClick={() => setFilter("low")}>
          Low Confidence
        </button>
      </div>

      {filteredData.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h2>
            {item.customer_name || "Unknown Customer"}
          </h2>

          <p>
            <b>ID:</b> {item.id}
          </p>

          <p>
            <b>Match:</b> {item.match}
          </p>

          <p>
            <b>Confidence:</b>{" "}
            {(item.confidence * 100).toFixed(0)}%
          </p>

          <button>
            Review
          </button>
        </div>
      ))}

    </div>
  );
}

export default App;