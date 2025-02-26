import React, { useState } from 'react'
import QrScanner from 'react-qr-scanner';
import axios from 'axios';


const StudentAttendence = () => {
    const [scannedData, setScannedData] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleScan = async (data) => {

        if(!data) return
        if (data?.text) {
          setScannedData(data.text);
          setMessage('Processing...');
    
          try {
            const response = await axios.post('http://localhost:5000/api/attendance/markAttendance', { qrCodeData: data.text });
            setMessage(response.data.message || 'Attendance marked successfully');
          } catch (err) {
            setMessage(err.response?.data?.message || 'Error marking attendance');
          }
        }
      };
    
      const handleError = (err) => {
        console.error(err);
      };
    
    
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
    <h1>QR Code Scanner</h1>
    <QrScanner
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: '300px', margin: 'auto' }}
    />
    <h2>Scanned Data:</h2>
    <p>{scannedData || "Scan a QR code"}</p>
    <h3>{message}</h3>
  </div>

  )
}

export default StudentAttendence