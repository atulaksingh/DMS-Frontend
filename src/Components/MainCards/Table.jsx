import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net"; // Import DataTables JS
const Table = () => {
  useEffect(() => {
    $("#example").DataTable();
  }, []);

  return (
    <div>
      <div>
        <table id="example" className="display">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td>$320,800</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
