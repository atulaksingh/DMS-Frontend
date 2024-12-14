import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch client details
export const fetchClientDetails = createAsyncThunk(
  "client/fetchDetails",
  async (id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/detail-client/${id}`);
    return response.data;
  }
);

// Create the slice
const clientSlice = createSlice({
  name: "client",
  initialState: {
    clientData: null,
    ownerData: null,
    bankData: null,
    branchData: null,
    clientUserData: null,
    companyDocData: null,
    CVData: null,
    PfData: null,
    taxAuditData: null,
    airData: null,
    sftData: null,
    tdsReturnData: null,
    tdsPaymentData: null,
    salesInvoiceData: null,
    purchaseInvoiceData: null,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientDetails.fulfilled, (state, action) => {
        console.log("action",action.payload)
        state.status = "succeeded";
        state.clientData = action.payload.Client;
        state.ownerData = action.payload.Owner;
        state.bankData = action.payload.Bank;
        state.branchData = action.payload.Branch;
        state.clientUserData = action.payload.ClientUser;
        state.companyDocData = action.payload.Company_Document;
        state.CVData = action.payload.Customer_or_Vendor;
        state.PfData = action.payload.PF;
        state.taxAuditData = action.payload.Tax_Audit;
        state.airData = action.payload.AIR;
        state.sftData = action.payload.SFT;
        state.tdsReturnData = action.payload.TDS_Return;
        state.tdsPaymentData = action.payload.TDS_Payment;
        state.salesInvoiceData = action.payload.sales_invoice;
        state.purchaseInvoiceData = action.payload.purchase_invoice;
      })
      .addCase(fetchClientDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default clientSlice.reducer;
