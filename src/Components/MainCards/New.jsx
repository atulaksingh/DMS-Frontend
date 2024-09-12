import React from 'react';
import { Button } from '@mui/material';
import DataTable from 'react-data-table-component';
// import CustomMaterialMenu from './CustomMaterialMenu'; // Adjust path if needed

// Custom SVG Icon
const CustomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 96 960 960"
    width="24"
    fill="#43a047"
  >
    <path d="M480 576m0-160 192 192-192 192-192-192 192-192z"/>
  </svg>
);

const basicColumns = [
  { name: 'Title', selector: row => row.title },
  { name: 'Year', selector: row => row.year },
];

const basicData = [
  { id: 1, title: 'Beetlejuice', year: '1988' },
  { id: 2, title: 'Ghostbusters', year: '1984' },
];

const advancedData = [
  { id: 1, title: 'Cutting Costs', by: 'me', lastOpened: 'Aug 7 9:52 AM' },
  { id: 2, title: 'Wedding Planner', by: 'me', lastOpened: 'Sept 14 2:52 PM' },
  { id: 3, title: 'Expense Tracker', by: 'me', lastOpened: 'Sept 12 2:41 PM' },
  { id: 4, title: 'Home Brew Water Calculator', by: 'me', lastOpened: 'Jube 3 5:45 PM' },
];

const customStyles = {
  headRow: { style: { border: 'none' } },
  headCells: { style: { color: '#202124', fontSize: '14px' } },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: { style: { border: 'none' } },
};

const advancedColumns = [
  { cell: () => <CustomIcon />, width: '56px' },
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true,
    grow: 2,
    style: { color: '#202124', fontSize: '14px', fontWeight: 500 },
  },
  { name: 'Owner', selector: row => row.by, sortable: true, style: { color: 'rgba(0,0,0,.54)' } },
  { name: 'Last opened', selector: row => row.lastOpened, sortable: true, style: { color: 'rgba(0,0,0,.54)' } },
  // Add custom menu or any other action buttons
];

function New() {
  return (
    <>
     <div className='container mx-auto'>
     {/* <Button variant="contained" color="primary">
        Material UI Button
      </Button>

      <div>Advanced Table</div> */}
      <DataTable
        title="Google Sheets-esque"
        columns={advancedColumns}
        data={advancedData}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
      />
     </div>
    </>
  );
}

export default New;
