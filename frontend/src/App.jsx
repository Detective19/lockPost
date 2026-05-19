import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState(null);

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

  const markResolved = async(id)=>{

 await axios.patch(
  `http://127.0.0.1:8000/reviews/${id}`
 )

 alert("Resolved")

 setSelectedReview(null)

 window.location.reload()

}

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
        <button
onClick={()=>
window.open(
"http://127.0.0.1:8000/export"
)
}
>

Export CSV

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
            <p>
 <b>Status:</b> {item.status}
</p>
         <button
  onClick={() => setSelectedReview(item)}
>
  Review
</button>
        </div>
      ))}
    {selectedReview && (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      padding: "20px",
      width: "600px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      boxShadow: "0 0 20px rgba(0,0,0,0.2)"
    }}
  >
    <h2>
      {selectedReview.customer_name}
    </h2>

    <p>
      <b>Match:</b> {selectedReview.match}
    </p>

    <p>
      <b>Confidence:</b>{" "}
      {(selectedReview.confidence * 100).toFixed(0)}%
    </p>

    <h3>Order Details</h3>

    <pre
      style={{
        maxHeight: "150px",
        overflow: "auto"
      }}
    >
      {JSON.stringify(
        selectedReview.order_json,
        null,
        2
      )}
    </pre>

    <h3>Delivery Details</h3>

    <pre
      style={{
        maxHeight: "150px",
        overflow: "auto"
      }}
    >
      {JSON.stringify(
        selectedReview.delivery_json,
        null,
        2
      )}
    </pre>
      <button
 onClick={()=>
   markResolved(
     selectedReview.id
   )
 }
>
Mark Resolved
</button>
    <button
      onClick={() =>
        setSelectedReview(null)
      }
    >
      Close
    </button>
  </div>
)}
    </div>
  );
}

export default App;