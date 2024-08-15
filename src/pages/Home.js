
import '../assets/Home.css';
import { useState, useEffect } from 'react';
import * as React from 'react';
import planeIcon from '../images/plane_icon.png';
import dealIcon from '../images/deal_icon.png';
import discoverIcon from '../images/discover_icon.png';
import profileIcon from '../images/profile_icon.png';
import arrivalIcon from '../images/arrival.png';
import departureIcon from '../images/departure.png';
import hotel from '../images/hotels.png';
import travel from '../images/travel.png';
import car from '../images/car.png';
import { CalendarTwoTone } from '@ant-design/icons';
import { Select, Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design'in stillerini import et
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import { Checkbox } from "antd";
import airplaneIcon from '../images/airplane.svg';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FlightDetails from '../components/FlightsDetails'; 

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Home() {
  
  const [activeButton, setActiveButton] = useState('oneWay');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [flightsData, setFlightsData] = useState([]);

  const [roundTripFlightsData, setRoundTripFlightsData] = useState([]);
  const [departureNames, setDepartureNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [showFlights, setShowFlights] = useState(false);
  const [departureDate, setDepartureDate] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureName, setDepartureName] = useState('');
  const [arrivalName, setArrivalName] = useState('');
  const disablePastDates = (current) => {
    // `current` tarih seçimini temsil eder
    // Bugünkü tarih ve öncesi tarihler disable edilir
    return current && current < moment().startOf('day');
  };
  
  const handleButtonClick = (type) => {
    setActiveButton(type);
  };
   // Buton stillerini tanımlama
   const buttonStyle = (buttonType) => ({
    width: '50%',
    maxWidth: buttonType === 'roundTrip' ? '200px' : '100px',
    backgroundColor: activeButton === buttonType ? 'rgb(68,8,145)' : 'transparent',
    color: activeButton === buttonType ? 'white' : 'black',
    borderColor: activeButton === buttonType ? 'rgb(68,8,145)' : 'black',
    borderTopRightRadius:'roundTrip'===buttonType?'0px':'20px',
    borderBottomRightRadius:'roundTrip'===buttonType?'0px':'20px',
    borderTopLeftRadius:'oneWay'===buttonType?'0px':'20px',
    borderBottomLeftRadius:'oneWay'===buttonType?'0px':'20px',
    
  });
  const convertToTime = (dateString) => {
    if(dateString===undefined)
    return `undefined`;
  else{
    const [datePart, timePart] = dateString.split('T');
  const [hours, minutes] = timePart.split(':');

 

  // Saat ve dakika bilgilerini iki haneli string olarak formatla
  const formattedHours = hours.padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');

  // Tarih ve saati "DD-MM-YYYY HH:MM" formatında döndür
  return `${formattedHours}:${formattedMinutes}`;
  }console.log(dateString);
    
    
  // Tarih string'ini ayır
  
   };
  const formatTimeWithoutSeconds = (timeString) => {
    // Zaman string'ini saat ve dakika olarak ayır
    const [hours, minutes] = timeString.split(':');
  
    // Saat ve dakika bilgilerini döndür
    return `${hours}:${minutes}`;
  };
  const calculateDuration = (endDateTime, startDateTime) => {
    if(endDateTime !==undefined)
    {
       // Tarih ve saat string'lerini Date nesnesine dönüştür
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  // Süre farkını hesapla (milisaniye cinsinden)
  const durationMillis = end - start;

  // Süreyi dakika ve saat olarak hesapla
  const durationMinutes = Math.floor(durationMillis / 60000); // Dakika cinsinden
  const durationHours = Math.floor(durationMinutes / 60); // Saat cinsinden
  const remainingMinutes = durationMinutes % 60; // Kalan dakikalar

  return `${durationHours}h ${remainingMinutes}m`;
    }
    else return `unknown`;

   
};

const getUniqueFlightStates = (departureNames) => {
  // FlightStates'leri toplayan bir Set oluştur
  const flightStatesSet = new Set();
  
  // flightsData'dan flightStates'leri al ve Set'e ekle
  departureNames.forEach(flight => {
    if (flight.prefixICAO) {
      flightStatesSet.add(flight.prefixICAO);
    }
  });
  
  
  // Set'i diziye dönüştür ve her state için bir seçenek oluştur
  return Array.from(flightStatesSet).map(state => ({
    value: state,
    label: state
  }));
};
const getUniqueFlightRoute = (departureNames) => {
  // FlightStates'leri toplayan bir Set oluştur
  const flightStatesSet = new Set();
  
  // flightsData'dan flightStates'leri al ve Set'e ekle
  departureNames.forEach(flight => {
    flight.route.destinations.forEach(route => {
      flightStatesSet.add(route);
    });
  });
  
  
  // Set'i diziye dönüştür ve her state için bir seçenek oluştur
  return Array.from(flightStatesSet).map(route => ({
    value: route,
    label: route
  }));
};
// Örnek Kullanım



useEffect(() => {
  setLoading(true);
  axios.get('/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime', {
    headers: {
      'Accept': 'application/json',
      'app_id': '2a972bb0',  // Kendi app_id'nizi buraya koyun
      'app_key': '7f9d37b47fb773fb1670040efa098d1a',  // Kendi app_key'nizi buraya koyun
      'ResourceVersion': 'v4'
    }
  })
  .then(response => {
    

    // Yanıtın flights alanında bir dizi olduğunu doğrulayın
    if (Array.isArray(response.data.flights)) {
      setDepartureNames(response.data.flights);
    } else {
      console.error('Expected an array in response.data.flights but got:', response.data.flights);
      setDepartureNames([]);
    }
    setLoading(false);
  })
  .catch(error => {
    if (error.response) {
      setError(`Error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      setError('No response received');
    } else {
      setError(`Error: ${error.message}`);
    }
    setLoading(false);
  });
  
}, [departure,arrival]);



  const handleDepartureDateChange = (date, dateString) => {
    setDepartureDate(date ? date.format('YYYY-MM-DD') : null); // Tarih formatı 'YYYY-MM-DD'
  };
  const handleArrivalDateChange = (date, dateString) => {
    setArrivalDate(date ? date.format('YYYY-MM-DD') : null); // Tarih formatı 'YYYY-MM-DD'
  };
  const handleChangeDeparture = (value) => {
    
    setDeparture(value);
    
    
  };
  const handleChangeArrival = (value) => {
    
    setArrival(value);
    
  };
  const handleShowFlightsClick = () => {
    console.log('Show flights clicked');
  };
  const listFlights = (data) => {
   
   
      if(arrival!==null && departure!==null && departureDate !== null)
    {
      setLoading(true);
    let params= {
        airline:departure,
        route: arrival ,// Örnek parametre,
        scheduleDate: departureDate,
       
    }
    axios.get('/public-flights/flights', {
      params:params,
      headers: {
        'Accept': 'application/json',
        'app_id': '2a972bb0',  // Kendi app_id'nizi buraya koyun
        'app_key': '7f9d37b47fb773fb1670040efa098d1a',  // Kendi app_key'nizi buraya koyun
        'ResourceVersion': 'v4'
      }
    })
    .then(response => {
      
      // Yanıtın flights alanında bir dizi olduğunu doğrulayın
      if (Array.isArray(response.data.flights)) {
        setFlightsData(response.data.flights);
       
      } 
      else
      {
        setFlightsData([]);
      }
      setShowFlights(true);
      setLoading(false);
     
    })
    .catch(error => {
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.statusText}`);
      } else if (error.request) {
        setError('No response received');
      } else {
        setError(`Error: ${error.message}`);
      }
      setLoading(false);
    });
    }
    
    
    
    
  };
  useEffect(() => {
    if (departure) {
      const fetchArrivalName = async () => {
        setLoading(true);
        try {
          
          const response = await axios.get(`public-flights/destinations/${departure}`, {
           
            headers: {
              
              'Accept': 'application/json',
              'app_id': '2a972bb0',  // Kendi app_id'nizi buraya koyun
              'app_key': '7f9d37b47fb773fb1670040efa098d1a',  // Kendi app_key'nizi buraya koyun
              'ResourceVersion': 'v4'
            }
          });
          
          if (response.data && response.data.publicName) {
            
            setDepartureName(response.data.publicName.english);
          } else {
            setDepartureName('No data found');
          }
        } catch (error) {
          if (error.response) {
            setError(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else if (error.request) {
            setError('No response received');
          } else {
            setError(`Error: ${error.message}`);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchArrivalName();
    }
    if (arrival) {
      const fetchArrivalName = async () => {
        setLoading(true);
        try {
          
          const response = await axios.get(`public-flights/destinations/${arrival}`, {
           
            headers: {
              
              'Accept': 'application/json',
              'app_id': '2a972bb0',  // Kendi app_id'nizi buraya koyun
              'app_key': '7f9d37b47fb773fb1670040efa098d1a',  // Kendi app_key'nizi buraya koyun
              'ResourceVersion': 'v4'
            }
          });
          console.log(response.data);
          if (response.data && response.data.publicName) {
            
            setArrivalName(response.data.publicName.english);
          } else {
            setArrivalName('No data found');
          }
        } catch (error) {
          if (error.response) {
            setError(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else if (error.request) {
            setError('No response received');
          } else {
            setError(`Error: ${error.message}`);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchArrivalName();
    }
  }, [departure,arrival]);
  
  

  return (

    <div className="App" >

      <div className="container">

        <div className='header'>
          <div className='leftHeader'>
            <img src={planeIcon} className='planeIcon' alt='plane icon'></img>
            <b className='headerText'>PLANE SCAPE</b>
          </div>
          <div className='rightHeader'>
            <img src={dealIcon} className='rightIcon' alt='deal icon'></img>
            <span className='rightText'>Deals</span>
            <img src={discoverIcon} className='rightIcon' alt='discover icon'></img>
            <span className='rightText'>Discover</span>
            <img src={profileIcon} className='rightIcon' alt='profile icon'></img>
            <span className='rightText'>Eray Alçin</span>
          </div>
        </div>
        <div className='content'>
          <div className='topContent'>
            <div className='searchContainer'>
              <div className='search'>


                <div className='leftSearch'>
                  
                  <img src={airplaneIcon} width={"20px"} style={{ marginRight: '10px' }} className='searchPlaneIcon' alt='plane icon'></img>
                  <b className='headerText'>BOOK YOUR FLIGHT</b>
                </div>
                <div className='rightSearch'>

                  
                    <Button   style={buttonStyle('roundTrip')}   onClick={() => handleButtonClick('roundTrip')} value="round">Round trip</Button>
                    <Button  style={buttonStyle('oneWay')} onClick={() => handleButtonClick('oneWay')} value="oneway">One way </Button>

                  
                </div>
              </div>
              <div className='inputContainer'>
                <div style={{
                  backgroundColor: 'white', border: '1px solid gray', paddingLeft: 10, borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15, width: '100%', display: 'flex', alignItems: 'center'
                }}>
                  <img src={departureIcon} alt="My Icon" style={{ width: 20, height: 20 }} />

                  <Select
                    showSearch
                    style={{
                      width: '100%'

                    }}
                    
                    onChange={handleChangeDeparture}
                    optionFilterProp="label"
                    suffixIcon={null}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      ...getUniqueFlightStates(departureNames)
                      

                    ]}
                  />
                </div>
                <div style={{
                  backgroundColor: 'white', border: '1px solid gray', paddingLeft: 10, borderTopRightRadius: 15,
                  borderBottomRightRadius: 15, width: '100%', display: 'flex', alignItems: 'center', marginLeft: 3,
                }}>
                  <img src={departureIcon} alt="My Icon" style={{ width: 20, height: 20 }} />

                  <Select
                    showSearch
                    style={{
                      width: '100%'

                    }}
                    
                    onChange={handleChangeArrival}
                    optionFilterProp="label"
                    suffixIcon={null}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      ...getUniqueFlightRoute(departureNames)

                    ]}
                  />
                </div>
                <div style={{
                  marginLeft: 25, backgroundColor: 'white', border: '1px solid gray', paddingLeft: 10, borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15, width: '100%', display: 'flex', alignItems: 'center'
                }}>
                  <CalendarTwoTone twoToneColor="rgb(179, 37, 246)" />

                  <Space style={{ width: '100%' }} direction="vertical">
                    <DatePicker  disabledDate={disablePastDates} style={{ width: '100%' }} onChange={handleDepartureDateChange} placeholder={null} suffixIcon={null} />

                  </Space>
                </div>
                <div style={{
                  backgroundColor: activeButton === 'oneWay' ? 'rgb(203,203,203)	' : 'transparent', border: '1px solid gray', paddingLeft: 10, borderTopRightRadius: 15,
                  borderBottomRightRadius: 15, width: '100%', display: 'flex', alignItems: 'center', marginLeft: 3,
                }}>
                  <CalendarTwoTone twoToneColor="rgb(179, 37, 246)" />


                  <Space style={{ width: '100%' }} direction="vertical">
                    <DatePicker disabledDate={disablePastDates} disabled={activeButton === 'oneWay'} style={{ width: '100%' ,backgroundColor: activeButton === 'oneWay' ? 'rgb(203,203,203)	' : 'transparent',}} onChange={handleArrivalDateChange} placeholder={null} suffixIcon={null} />

                  </Space>
                </div>


              </div>
              <Button onClick={listFlights} style={{ fontWeight: 'bold', height: 40, marginTop: 20, backgroundColor: 'rgb(68,8,145)' }} type="primary">
                Show flights
              </Button>

            </div>
            <div className='flightsContainer'>
            <div style={{ width: '70%' }}>
            {showFlights && (
        
          <div className='flightsContainer1'>
            
           
              
             {flightsData.map((flight) => (
                
                <FlightDetails
                  key={flight.id}
                  departureName={departureName}
                  arrivalName={arrivalName}
                  departureDate={departureDate}
                  departureTime={formatTimeWithoutSeconds(flight.scheduleTime)}
                  departureAirport={flight.prefixICAO}
                  arrivalTime={convertToTime(flight.estimatedLandingTime)}
                  arrivalAirport={flight.route.destinations[0]}
                  flightDuration={calculateDuration(flight.actualLandingTime, flight.scheduleDateTime)}
                  price="Price not available"
                  
                />
              ))}
            
          </div>
        
      )}
     
      </div>

              <div className='flightsContainer2'>
                <p style={{fontWeight:'bold'}}>Sort by</p>
                <Select
                defaultValue="low"
        style={{ flex: 1 ,width:'100%',borderRadius:5}}
        options={[
          { value: 'low', label: 'Lowest Price' },
          { value: 'high', label: 'Highest Price' },
          
        ]}
      />
      <p style={{fontWeight:'bold',marginTop:10}}>Arrival Time</p>
      <Checkbox style={{width:'85%',marginBottom:5}} >5:00 AM - 11:59 AM </Checkbox>
      
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}} >12:00 PM - 5:59 PM</Checkbox>

      <p style={{fontWeight:'bold',marginTop:10}}>Stops</p>
      <Checkbox style={{width:'85%',marginBottom:5}}>Nonstop</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>1 Stop</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>2+ Stops</Checkbox><span style={{fontSize:14}}>$230</span>


      <p style={{fontWeight:'bold',marginTop:10}}>Airlines Included</p>
      <Checkbox  style={{width:'85%',marginBottom:5}}>Alitalia</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>Lufthansa</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>Air France</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>Brussels Airlines</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>Air Italy</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>Siberia</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%'}}>Air Europa</Checkbox><span style={{fontSize:14}}>$230</span>

              </div>
            </div>
            

          </div>


          <div className='secondContainer'>
            <img src={car} style={{ height: 250, width:'100%', borderRadius:20 }} alt='car' />
            <img src={hotel} style={{ height: 280 , width:'100%',borderRadius:20,marginTop:30}} alt='hotel' />
            <img src={travel} style={{ height: 280, width:'100%',borderRadius:20 ,marginTop:30}} alt='travel' />
          </div>



        </div>

      </div>


    </div>

  );
}

export default Home;
