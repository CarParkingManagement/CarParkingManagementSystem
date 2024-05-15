import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'; // Import Text and other necessary components
import "bootstrap/dist/css/bootstrap.min.css";
import './parkingReceipt.css';
import backgroundImage from '../../images/pk2.jpeg'; 

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    marginBottom: 10,
  },
});

const ParkingReceipt = () => {
  const [parkingData, setParkingData] = useState({});

  useEffect(() => {
    // Retrieve data from local storage
    const areaName = localStorage.getItem('areaName');
    const zoneName = localStorage.getItem('zoneName');
    const slotName = localStorage.getItem('slotName');
    const parkingFromDate = localStorage.getItem('parkingFromDate');
    const parkingToDate = localStorage.getItem('parkingToDate');
    const parkingFromTime = localStorage.getItem('parkingFromTime');
    const parkingToTime = localStorage.getItem('parkingToTime');
    const carNo = localStorage.getItem('carNo');
    const totalAmt = localStorage.getItem('totalAmt');

    // Set the data to state
    setParkingData({
      areaName,
      zoneName,
      slotName,
      parkingFromDate,
      parkingToDate,
      parkingFromTime,
      parkingToTime,
      carNo,
      totalAmt
    });
  }, []);

  const handleDownload = async () => {
    // Define the content of the PDF document
    const pdfContent = (
      <Document>
        <Page>
          <View style={styles.container}>
            <Text style={styles.text}>Parking Area: {parkingData.areaName}</Text>
            <Text style={styles.text}>Parking Zone: {parkingData.zoneName}</Text>
            <Text style={styles.text}>Parking Slot: {parkingData.slotName}</Text>
            <Text style={styles.text}>From Date: {parkingData.parkingFromDate}</Text>
            <Text style={styles.text}>To Date: {parkingData.parkingToDate}</Text>
            <Text style={styles.text}>From Time: {parkingData.parkingFromTime}</Text>
            <Text style={styles.text}>To Time: {parkingData.parkingToTime}</Text>
            <Text style={styles.text}>Car Number: {parkingData.carNo}</Text>
            <Text style={styles.text}>Total Amount: {parkingData.totalAmt}</Text>
          </View>
        </Page>
      </Document>
    );

    // Generate PDF blob and save
    const blob = await pdf(pdfContent).toBlob();
    saveAs(blob, 'receipt.pdf');
  };

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" 
    }}>
      <div className='style'>
        <center>
          <h2>Parking Receipt</h2>
        </center>
        <table className='table-bordered'>
          <tbody>
            <tr>
              <td>Parking Area</td>
              <td>{parkingData.areaName}</td>
            </tr>
            <tr>
              <td>Parking Zone</td>
              <td>{parkingData.zoneName}</td>
            </tr>
            <tr>
              <td>Parking Slot</td>
              <td>{parkingData.slotName}</td>
            </tr>
            <tr>
              <td>From Date</td>
              <td>{parkingData.parkingFromDate}</td>
            </tr>
            <tr>
              <td>To Date</td>
              <td>{parkingData.parkingToDate}</td>
            </tr>
            <tr>
              <td>From Time</td>
              <td>{parkingData.parkingFromTime}</td>
            </tr>
            <tr>
              <td>To Time</td>
              <td>{parkingData.parkingToTime}</td>
            </tr>
            <tr>
              <td>Car Number</td>
              <td>{parkingData.carNo}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{parkingData.totalAmt}</td>
            </tr>
          </tbody>
        </table>
        <br></br>
        <center>
          <button className='btn btn-primary' onClick={handleDownload}>Download Receipt</button>
        </center>
      </div>
    </div>
  );
}

export default ParkingReceipt;
