import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Typography,
} from '@mui/material';
import EditableTable from './EditableTable';

function ChartFormDialog({
  open,
  onClose,
  chartsCreated,
  setChartsCreated,
}) {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [chartName, setChartName] = useState('');
  const [chartType, setChartType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const chartData = {
      id: Math.floor(Math.random() * 1000),
      chartName,
      chartType,
      rows: [...rows],
      columns: [...columns],
    };
    setChartsCreated([...chartsCreated, chartData]);
    handleClose();
  };

  const handleClose = () => {
    setChartName('');
    setChartType('');
    setRows([]);
    setColumns([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <h2>Create Chart</h2>
      </DialogTitle>
      <DialogContent>
        <form id="chart-form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Chart Name"
            value={chartName}
            onChange={(e) => setChartName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            select
            label="Chart Type"
          >
            <MenuItem value="pie">Pie Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
          </TextField>

          {chartType && (
            <>
              <Typography style={{ marginTop: 10, marginBottom: 10 }}>
                <h3>Edit your table data</h3>
              </Typography>
              <EditableTable
                chartType={chartType}
                rows={rows}
                columns={columns}
                setRows={setRows}
                setColumns={setColumns}
              />
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="chart-form">
          Create Chart
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ChartFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  chartsCreated: PropTypes.array.isRequired,
  setChartsCreated: PropTypes.func.isRequired,
};

export default ChartFormDialog;
