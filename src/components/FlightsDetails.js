import React, { useState } from 'react';
import PropTypes from 'prop-types';
import departureGray from '../images/departure_gray.png';
import airplanePurple from '../images/airplane_flights.png';
import arrivalGray from '../images/arrivalGray.png';
import { Button, Modal,notification } from 'antd';
import '../assets/Home.css';
import Test from '../pages/test';
import { useNavigate } from 'react-router-dom';
  

  
// Bileşeninizi fonksiyonel bir bileşen olarak tanımlayın
const FlightDetails = ({
    departureName,
    arrivalName,
    departureDate,
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  flightDuration,
  price,
  
}) => {
  const navigate = useNavigate();
  const openNotification = () => {
    notification.open({
      message: 'Flight Data Submitted',
      description:
        'Your flight data has been successfully submitted.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    // 5 saniye sonra yönlendirme
    const timer = setTimeout(() => {
      navigate('/pages/flights'); // Kullanıcıyı /flights sayfasına yönlendir
    }, 5000); // 5000 ms = 5 saniye

    // Temizlik işlevi: Timer'ı temizle
    return () => clearTimeout(timer);
  };
  
  const [formData, setFormData] = useState({
    departureName: '',
    arrivalName: '',
    departureDate: '',
    departureTime: '',
    departureAirport: '',
    arrivalTime: '',
    arrivalAirport: '',
    flightDuration: '',
    price: '',
  });



  const handleOk = async (e) => {
    setIsModalOpen(false);
    const value = {
      departureName: departureName,
      arrivalName: arrivalName,
      departureDate: departureDate,
      departureTime: departureTime,
      departureAirport: departureAirport,
      arrivalTime: arrivalTime,
      arrivalAirport: arrivalAirport,
      flightDuration: flightDuration,
      price:  price,
    };
    setFlightData(value);
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });

    const data = await response.json();
    openNotification();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flightData, setFlightData] = useState(null);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
const handleReservation =(key) => {
  setIsModalOpen(true);
  

}

const handleComplete = () => {
  // Bu işlev FlightForm tamamlandığında çağrılacak
  console.log('Flight data has been submitted.');
};
  return (
    <div>
    <div style={{
      backgroundColor: 'white',
      paddingLeft:20,
      
      
      borderRadius: 15,
      borderBottomLeftRadius: 0,
      
    }}>
      <h4 style={{paddingTop:25,}}>{departureName} - {arrivalName}</h4>
      <div className='flightsDetails' style={{ display: 'flex', alignItems: 'center',marginTop:25}}>
        <div style={{ width: '15%'}}>
          <p style={{ fontSize: 12, margin: 0, padding: 0 }}>
            <img src={departureGray} alt='departure_gray' style={{ width: 15, height: 15, marginRight: 10 }} />
            Departure
          </p>
          <p style={{ fontWeight: 'bold', padding: 0, marginTop: 3, marginBottom: 3 }}>{departureTime}</p>
          <p style={{ padding: 0, marginTop: 0, marginBottom: 0 }}>Airport: {departureAirport}</p>
        </div>
        <div style={{ width: '10%', alignContent: 'center' }}>
          <hr />
        </div>
        <div style={{ width: '15%', textAlign: 'center' }}>
          <img src={airplanePurple} alt='departure_gray' style={{ width: 25, height: 25, marginRight: 10, transform: 'rotate(90deg)' }} />
          <p style={{ padding: 0, marginTop: 0, marginBottom: 0, fontSize: 12 }}>{flightDuration} (NonStop)</p>
        </div>
        <div style={{ width: '10%', alignContent: 'center' }}>
          <hr />
        </div>
        <div style={{ width: '15%',marginRight:20,}}>
          <p style={{ fontSize: 12, margin: 0, padding: 0 }}>
            <img src={arrivalGray} alt='arrival_gray' style={{ width: 15, height: 15, marginRight: 10 }} />
            Arrival
          </p>
          <p style={{ fontWeight: 'bold', padding: 0, marginTop: 3, marginBottom: 3 }}>{arrivalTime}</p>
          <p style={{ padding: 0, marginTop: 0, marginBottom: 0 }}>Airport: {arrivalAirport}</p>
        </div>
      </div>
      <div className='flightsDetailsBooking' style={{ display: 'flex', marginTop: 10 }}>
        <div style={{ width: '100%' }} className='flightsPrice'>
          <p style={{ fontSize: 16, margin: 0, padding: 0, marginBottom: 5, color: 'rgb(68,8,145)', fontWeight: 'bold' }}>
            Price: <span  style={{color:'black',fontSize:12}}>{price}</span>
          </p>
          <p style={{ fontSize: 12, margin: 0, padding: 0 }}>Round Trip</p>
        </div>
        <div style={{ width: '25%', margin: 0, padding: 0 }} className='flightsBooking'>
          <button  onClick={handleReservation} style={{
            borderRadius: 0,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: 15,
            fontWeight: 'bold',
            backgroundColor: 'rgb(68,8,145)',
            height: '60px',
            width: '100%',
            color: 'white',
            border: 'none',
            fontSize:14,
          }}>
            
            Show flights
          </button>
          <Modal title="Ticket Details" centered
 open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{departureName}({departureAirport}) - {arrivalName}({arrivalAirport})</p>
        <p>Departure Date: {departureDate}</p>
        <p>Departure Time: {departureTime}</p>
       
      </Modal>
     
        </div>
        
      </div>
      
     
    </div>
    <div style={{ backgroundColor:'rgb(229,224,234)',padding:15,borderBottomLeftRadius:15,borderBottomRightRadius:15, width:'20%',textAlign:'center',marginBottom:20 }} className='flightsBooking'>
                  <a href='#' style={{fontSize:14,color:'rgb(68,8,145)'}}>Check the details</a>
                  </div>
                  </div>
    
  );
};

// PropTypes ile prop'ları tanımlayın
FlightDetails.propTypes = {
    departureName:PropTypes.string.isRequired,
    arrivalName:PropTypes.string.isRequired,
    departureDate:PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  departureAirport: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  arrivalAirport: PropTypes.string.isRequired,
  flightDuration: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  
 
};

export default FlightDetails;