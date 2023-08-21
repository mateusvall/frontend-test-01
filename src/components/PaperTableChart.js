import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { chartSettings } from '../configs/chartSettings';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function PaperTableChart({chart, chartsCreated, setChartsCreated}) {

  const [columns, setColumns] = useState([...chart.columns]);
  const [rows, setRows] = useState([...chart.rows]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleColumnChange = useCallback((index, value) => {
    setColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      updatedColumns[index] = value;
      return updatedColumns;
    });
  }, []);

  const handleRowChange = useCallback((rowIndex, columnIndex, value) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows[rowIndex][columnIndex] = value;
      return updatedRows;
    });
  }, []);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDeleteChart = useCallback(() => {
    const updatedCharts = chartsCreated.filter(chartCreated => chartCreated.id !== chart.id);
    setChartsCreated(updatedCharts);
    handleMenuClose();
  }, [chartsCreated, chart.id]);

  // const addColumn = () => {
  //   const newColumn = `Column ${columns.length + 1}`;
  //   setColumns([...columns, newColumn]);

  //   const newRows = rows.map((row) => [...row, '']);
  //   setRows(newRows);
  // };

  const addRow = () => {
    const newRow = Array.from({ length: columns.length }, () => '');
    setRows([...rows, newRow]);
  };

  const toggleEditMode = () => {
    if(editMode) handleSaveChanges()
    setEditMode(!editMode);
    handleMenuClose();
  };


  const handleSaveChanges = useCallback(() => {
    const updatedChartsCreated = chartsCreated.map(item =>
      item.id === chart.id
        ? {
            ...item,
            columns: [...columns],
            rows: [...rows]
          }
        : item
    );
    setChartsCreated(updatedChartsCreated);
  }, [chartsCreated, chart.id, columns, rows]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{chart.chartName}</h2>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
          <MenuItem onClick={toggleEditMode}>{editMode ? 'Save changes' : 'Edit Mode'}</MenuItem>
          <MenuItem onClick={handleDeleteChart}>{'Delete Chart'}</MenuItem>
        </Menu>
      </div>
      {editMode 
        ? (<TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}>
                      <TextField
                        value={column}
                        onChange={(e) => handleColumnChange(columnIndex, e.target.value)}
                        disabled={!editMode}
                      />
                    </TableCell>
                  ))}
                  {editMode && chart.chartType !== 'line' &&(
                    <TableCell>
                      {/* <Button variant="outlined" color="primary" onClick={addColumn}>
                        Add Column
                      </Button> */}
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <TableCell key={columnIndex}>
                        <TextField
                          value={cell}
                          onChange={(e) =>
                            handleRowChange(rowIndex, columnIndex, e.target.value)
                          }
                          disabled={!editMode}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {editMode && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1}>
                      <Button variant="outlined" color="primary" onClick={addRow}>
                        Add Row
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </TableContainer>
       ):(
        <> 
          <HighchartsReact
            highcharts={Highcharts}
            options={chartSettings(chart, chart.chartType)}
          />
        </>
      )}
    </Paper>
  );
};

PaperTableChart.propTypes = {
  chart: PropTypes.shape({
    id: PropTypes.number.isRequired,
    chartName: PropTypes.string.isRequired,
    chartType: PropTypes.oneOf(['line', 'pie']).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
  }).isRequired,
  chartsCreated: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    chartName: PropTypes.string.isRequired,
    chartType: PropTypes.oneOf(['line', 'pie']).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired
  })).isRequired,
  setChartsCreated: PropTypes.func.isRequired
};

export default PaperTableChart;
