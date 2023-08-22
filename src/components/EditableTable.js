import React, { useEffect, useCallback } from 'react';
import { initialColumns,initialRows } from '../configs/initialTableData';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button, 
  TextField 
} from '@mui/material';

function EditableTable({
  rows,
  setRows,
  columns,
  setColumns,
  chartType
}) {
  
  const initializeTable = () => {
    setColumns(initialColumns[chartType])
    setRows(initialRows[chartType])
  };
  
  useEffect(() => {
    initializeTable()
  }, [chartType]);
  
  const addRow = () => {
    setRows([...rows, Array(columns.length).fill('')]);
  };

  const addColumn =() => {
    setColumns([...columns, `Column ${columns.length + 1}`]);
    setRows(rows.map(row => [...row, '']));
  };

  const handleColumnChange = useCallback(
    (columnIndex, value) => {
      const newColumns = [...columns];
      newColumns[columnIndex] = value;
      setColumns(newColumns);
    },
    [columns, setColumns]
  );  

  const handleCellChange = useCallback(
    (rowIndex, columnIndex, value) => {
      const updatedRows = rows.map((row, idx) =>
        idx === rowIndex ? row.map((cell, cellIdx) =>
          cellIdx === columnIndex ? value : cell
        ) : row
      );
      setRows(updatedRows);
    },
    [rows, setRows]
  );
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, columnIndex) => (
              <TableCell key={columnIndex}>
                <TextField
                  value={column}
                  onChange={e => handleColumnChange(columnIndex, e.target.value)}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <TableCell key={columnIndex}>
                  <TextField
                    value={cell}
                    onChange={e => handleCellChange(rowIndex, columnIndex, e.target.value)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent:'space-around', marginTop: '10px', marginBottom: '10px'}}>
        <Button variant="outlined"  onClick={addRow}>Add Row</Button>
        {/* <Button variant="outlined"  onClick={addColumn}>Add Column</Button> */}
      </div>
      
    </TableContainer>
  );
};

export default EditableTable;
