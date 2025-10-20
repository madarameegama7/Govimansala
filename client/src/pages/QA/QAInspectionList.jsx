import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./QAStyles.css";

const QAInspectionList = () => {
  const [inspections, setInspections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        // Get token from localStorage (or wherever you store it)
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("http://localhost:8080/api/qa/inspections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter only pending inspections
        const pendingInspections = res.data.filter(
          (item) => item.status === "AVAILABLE"
        );

        setInspections(pendingInspections);
        console.log("Pending inspections:", pendingInspections);
      } catch (error) {
        console.error("Error fetching inspections:", error);
      }
    };

    fetchInspections();
  }, []);

  return (
    <div className="qa-list">
      <h2>Pending Product Inspections</h2>
      {inspections.length === 0 ? (
        <p>No pending inspections.</p>
      ) : (
        <table className="qa-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Farmer ID</th>
              <th>Harvest Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.name}</td>
                <td>{item.userId}</td>
                <td>{item.harvestDate}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="inspect-btn"
                    onClick={() =>
                      navigate(`/qa/inspection/${item.productId}`)
                    }
                  >
                    Inspect →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QAInspectionList;
