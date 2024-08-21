import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Typography, Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const App = () => {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState(0);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      alert('無法獲取病人資訊,請稍後再試')
    }
  };

  const handleClickOpen = async (orderId, patientId) => {
    setSelectedPatientId(patientId)
    setSelectedOrderId(orderId)
    if (!orderId) {
      setEditedData('');
      setIsEditMode(false)
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
        setEditedData(response.data?.Message);
        setIsEditMode(true)
      } catch (error) {
        console.error('Error fetching order:', error);
        alert('無法獲取醫囑資訊,請稍後再試')
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedData('');
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/order', {
        PatientId: selectedPatientId,
        Message: editedData
      })
      if (response.status === 201) {
        alert(response.data)
        fetchPatients();
        handleClose();
      } else {
        console.error('Error add order:', response.data);
        alert('新增失敗')
      }
    } catch (error) {
      console.error('Error add order:', error);
      alert('新增失敗')
    }
  }

  const handleModify = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/order/${selectedOrderId}`, {
        Message: editedData
      })
      if (response.status === 200) {
        alert(response.data)
        handleClose();
      } else {
        console.error('Error updating order:', response.data);
        alert('更新失敗')
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('更新失敗')
    }
  }

  // 定義自訂樣式的 TableRow
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      cursor: 'pointer',
    }
  }));

  return (
    <div style={{ maxWidth: '400px', margin: '50px' }}>
      <Typography variant="h3">Patients</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <StyledTableRow key={patient.Id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleClickOpen(patient.OrderId, patient.Id)}>
                <TableCell align="right">{patient.Id}</TableCell>
                <TableCell align="right">{patient.Name}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="span">Order</Typography>
          {isEditMode ? (
            <Button variant="contained" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleModify}>更新</Button>) : (
            <Button variant="contained" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleAdd}>新增</Button>
          )}
        </DialogTitle>
        <DialogContent sx={{ width: '400px' }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="暫無資料"
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
          />
          <Button onClick={handleClose} color="primary" sx={{ width: '100%' }}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;