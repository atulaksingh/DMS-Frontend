import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MuiTable from "../Components/MainCards/MuiTable";

function HomePage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchClients = async () => {
          try {
              const response = await axios.get("http://127.0.0.1:8000/api/list-client");
              setClients(response.data); // Assuming the data is returned in the response body
              setLoading(false);
          } catch (error) {
              console.error("Error fetching clients:", error);
              toast.error("Failed to fetch client data.", {
                  position: "top-right",
                  autoClose: 2000,
              });
              setLoading(false);
          }
      };

      fetchClients();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
      return <div>Loading...</div>;
  }
  return (
    <>
      <div >
        
        <MuiTable tableData={clients} />
      </div>
    </>
  );
}

export default HomePage;
