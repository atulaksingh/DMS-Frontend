import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import MuiTable from "./Components/MainCards/MuiTable";
// import Card from "./Components/MainCards/card";
import Header from "./Components/MainCards/Header";
import MenuBar from "./Components/MainCards/MenuBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import ClientCreation from "./Components/MainCards/Clients/ClientCreation";
import 'react-toastify/dist/ReactToastify.css';
import ClientDetails from "./Components/MainCards/Clients/ClientDetails";
import ClientUpdate from "./Components/MainCards/Clients/ClientUpdate";
import BranchDetails from "./Components/MainCards/BranchD/BranchDetails";
import Master from "./pages/Master";
import PurchaseInvoice from "./pages/PurchaseInvoice";
import SalesInvoice from "./pages/SalesInvoice";
import CreditNote from "./Components/MainCards/Clients/Credit Note/CreditNote";
import DebitNote from "./Components/MainCards/Clients/DebitNote/DebitNote";
import IncomeDebitNote from "./Components/MainCards/Clients/IncomeDebitNote/IncomeDebitNote";
import ExpenseCreditNote from "./Components/MainCards/Clients/ExpenseCreditNote/ExpenseCreditNote";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Header />
        {/* <MenuBar /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/master" element={<Master />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/client" element={<ClientCreation />} />
          <Route path="/clientUpdate/:id" element={<ClientUpdate />} />
          <Route path="/clientDetails/:id" element={<ClientDetails />} />
          <Route path="/branchDetails/:clientID/:branchID" element={<BranchDetails />} />
          <Route path="/purchaseInvoice/:id/:rowId" element={<PurchaseInvoice />} />
          <Route path="/salesInvoice/:id/:rowId" element={<SalesInvoice />} />
          <Route path="/creditNote/:id/:purchID" element={<CreditNote />} />
          <Route path="/debitNote/:id/:salesID" element={<DebitNote />} />
          <Route path="/expenses/creditNote/:id/:expensesID" element={<ExpenseCreditNote />} />
          <Route path="/income/debitNote/:id/:incomeID" element={<IncomeDebitNote />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
