import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MuiTable from "../Components/MainCards/MuiTable";

function HomePage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
      try {
          const response = await axios.get("http://127.0.0.1:8000/api/list-client");
          // console.log("response",response.data)
          setClients(response.data.clients); // Assuming the data is returned in the response body
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
  useEffect(() => {

      fetchClients();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
      return <div>Loading...</div>;
  }
  return (
    <>
      <div >
        
        <MuiTable tableData={clients} fetchClients={fetchClients}/>
      </div>
    </>
  );
}

export default HomePage;
