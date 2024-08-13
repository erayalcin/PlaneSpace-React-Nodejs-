
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
import { DatePicker, Space } from 'antd';
import { Checkbox } from "antd";
import airplaneIcon from '../images/airplane.svg';
import departureGray from '../images/departure_gray.png';
import airplanePurple from '../images/airplane_flights.png';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Home() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  useEffect(() => {

  }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const handleChangeDeparture = (value) => {
    setDeparture(value);
    console.log('First select value:', departure);
  };
  const handleChangeArrival = (value) => {
    setArrival(value);
    console.log('First select value:', arrival);
  };
  const listFlights = (data) => {
    axios.get('/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime', {
      headers: {
        'Accept': 'application/json',
        'app_id': '2a972bb0',  // Kendi app_id'nizi buraya koyun
        'app_key': '7f9d37b47fb773fb1670040efa098d1a',  // Kendi app_key'nizi buraya koyun
        'ResourceVersion': 'v4'
      }
    })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        if (error.response) {
          setError(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setError('No response received');
        } else {
          setError(`Error: ${error.message}`);
        }
        /*  {error && <div>Error: {error}</div>}
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}*/
      });
  };

  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

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

                  <ToggleButtonGroup
                    color="primary"
                    className='test'
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"


                  >
                    <ToggleButton style={{ width: 'auto', maxWidth: '200px' }} value="web">Round trip</ToggleButton>
                    <ToggleButton style={{ width: 'auto', maxWidth: '100px' }} value="android">One way </ToggleButton>

                  </ToggleButtonGroup>
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
                      {
                        value: '1',
                        label: 'Not Identified',
                      },
                      {
                        value: '2',
                        label: 'Closed',
                      },

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
                      {
                        value: '1',
                        label: 'Not Identified',
                      },
                      {
                        value: '2',
                        label: 'Closed',
                      },

                    ]}
                  />
                </div>
                <div style={{
                  marginLeft: 25, backgroundColor: 'white', border: '1px solid gray', paddingLeft: 10, borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15, width: '100%', display: 'flex', alignItems: 'center'
                }}>
                  <CalendarTwoTone twoToneColor="rgb(179, 37, 246)" />

                  <Space style={{ width: '100%' }} direction="vertical">
                    <DatePicker style={{ width: '100%' }} onChange={onChange} placeholder={null} suffixIcon={null} />

                  </Space>
                </div>
                <div style={{
                  backgroundColor: 'white', border: '1px solid gray', paddingLeft: 10, borderTopRightRadius: 15,
                  borderBottomRightRadius: 15, width: '100%', display: 'flex', alignItems: 'center', marginLeft: 3,
                }}>
                  <CalendarTwoTone twoToneColor="rgb(179, 37, 246)" />


                  <Space style={{ width: '100%' }} direction="vertical">
                    <DatePicker style={{ width: '100%' }} onChange={onChange} placeholder={null} suffixIcon={null} />

                  </Space>
                </div>


              </div>
              <Button onClick={listFlights} style={{ fontWeight: 'bold', height: 40, marginTop: 20, backgroundColor: 'rgb(68,8,145)' }} type="primary">
                Show flights
              </Button>

            </div>
            <div className='flightsContainer'>

              <div style={{ width: '70%' }}>
                <div className='flightsContainer1' >
                  <div style={{backgroundColor:'white',paddingLeft:20,paddingRight:20,borderRadius:15,borderBottomLeftRadius:0,paddingRight:0,paddingBottom:0}}>

                  
                  <h4 className='flightsDetailsHeader'>Milano Madrid</h4>
                  <div className='flightsDetails'>
                    <div style={{ width:'15%' }}>
                    <p style={{fontSize:12,margin:0,padding:0}}><img src={departureGray} alt='departure_gray' style={{width:15,height:15,justifyContent:'center',marginRight:10}}/>Departure</p>
                    <p style={{fontWeight:'bold',padding:0,marginTop:3,marginBottom:3}}>7:30 AM</p>
                    <p style={{padding:0,marginTop:0,marginBottom:0}}>Airport:MXP</p>
                    </div>
                    <div style={{  width:'10%' , alignContent:'center'}}>
                      <hr ></hr>
                    </div>
                    <div style={{ width:'15%',textAlign:'center' }}>
                    <img src={airplanePurple} alt='departure_gray' style={{width:25,height:25,justifyContent:'center',marginRight:10,transform: 'rotate(90deg)'}}/>
                    <p style={{padding:0,marginTop:0,marginBottom:0,fontSize:12}}> 2h 25m (NonStop)</p>
                    </div>
                    <div style={{  width:'10%' , alignContent:'center'}}>
                      <hr  ></hr>
                    </div>
                    <div style={{ width:'15%'}}>
                    <p style={{fontSize:12,margin:0,padding:0}}><img src={departureGray} alt='departure_gray' style={{width:15,height:15,justifyContent:'center',marginRight:10}}/>Arrival</p>
                    <p style={{fontWeight:'bold',padding:0,marginTop:3,marginBottom:3}}>9.55 AM</p>
                    <p style={{padding:0,marginTop:0,marginBottom:0}}>Airport:MAD</p>
                    </div>

                  </div>
                  <div className='flightsDetailsBooking'>
                    <div style={{  width:'15%' }} className='flightsPrice'>
                    <p style={{fontSize:18,margin:0,padding:0,marginBottom:5,color:'rgb(68,8,145)',fontWeight:'bold'}}>Price: 200$</p>
                      <p style={{fontSize:14,margin:0,padding:0}}>Round Trip</p>
                    </div>
                    <div style={{  width:'20%',margin:0,padding:0}} className='flightsBooking'>
                    <Button onClick={listFlights} style={{ borderRadius:0,borderBottomRightRadius:15,borderTopLeftRadius:15,fontWeight: 'bold',  backgroundColor: 'rgb(68,8,145)' ,height:'60px',width:'100%'}} type="primary">
                Show flights
              </Button>
                    </div>
                  </div>
                  
                </div>

                <div style={{ marginBottom:20,backgroundColor:'rgb(229,224,234)',borderTop:'none',borderBottomLeftRadius:15,borderBottomRightRadius:15, width:'20%',textAlign:'center' }} className='flightsBooking'>
                  <p  ><a href='#' style={{fontSize:14,color:'rgb(68,8,145)'}}>Check the details</a></p>
                  </div>
                  <div style={{backgroundColor:'white',paddingLeft:20,paddingRight:20,borderRadius:15,borderBottomLeftRadius:0,paddingRight:0,paddingBottom:0}}>

                  
                  <h4 className='flightsDetailsHeader'>Milano Madrid</h4>
                  <div className='flightsDetails'>
                    <div style={{ width:'15%' }}>
                    <p style={{fontSize:12,margin:0,padding:0}}><img src={departureGray} alt='departure_gray' style={{width:15,height:15,justifyContent:'center',marginRight:10}}/>Departure</p>
                    <p style={{fontWeight:'bold',padding:0,marginTop:3,marginBottom:3}}>7:30 AM</p>
                    <p style={{padding:0,marginTop:0,marginBottom:0}}>Airport:MXP</p>
                    </div>
                    <div style={{  width:'10%' , alignContent:'center'}}>
                      <hr ></hr>
                    </div>
                    <div style={{ width:'15%',textAlign:'center' }}>
                    <img src={airplanePurple} alt='departure_gray' style={{width:25,height:25,justifyContent:'center',marginRight:10,transform: 'rotate(90deg)'}}/>
                    <p style={{padding:0,marginTop:0,marginBottom:0,fontSize:12}}> 2h 25m (NonStop)</p>
                    </div>
                    <div style={{  width:'10%' , alignContent:'center'}}>
                      <hr  ></hr>
                    </div>
                    <div style={{ width:'15%'}}>
                    <p style={{fontSize:12,margin:0,padding:0}}><img src={departureGray} alt='departure_gray' style={{width:15,height:15,justifyContent:'center',marginRight:10}}/>Arrival</p>
                    <p style={{fontWeight:'bold',padding:0,marginTop:3,marginBottom:3}}>9.55 AM</p>
                    <p style={{padding:0,marginTop:0,marginBottom:0}}>Airport:MAD</p>
                    </div>

                  </div>
                  <div className='flightsDetailsBooking'>
                    <div style={{  width:'15%' }} className='flightsPrice'>
                    <p style={{fontSize:18,margin:0,padding:0,marginBottom:5,color:'rgb(68,8,145)',fontWeight:'bold'}}>Price: 200$</p>
                      <p style={{fontSize:14,margin:0,padding:0}}>Round Trip</p>
                    </div>
                    <div style={{  width:'20%',margin:0,padding:0}} className='flightsBooking'>
                    <Button onClick={listFlights} style={{ borderRadius:0,borderBottomRightRadius:15,borderTopLeftRadius:15,fontWeight: 'bold',  backgroundColor: 'rgb(68,8,145)' ,height:'60px',width:'100%'}} type="primary">
                Show flights
              </Button>
                    </div>
                  </div>
                  
                </div>

                <div style={{ backgroundColor:'rgb(229,224,234)',borderTop:'none',borderBottomLeftRadius:15,borderBottomRightRadius:15, width:'20%',textAlign:'center' }} className='flightsBooking'>
                  <p  ><a href='#' style={{fontSize:14,color:'rgb(68,8,145)'}}>Check the details</a></p>
                  </div>
                </div>
               
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
      <p style={{fontWeight:'bold'}}>Arrival Time</p>
      <Checkbox style={{width:'85%',marginBottom:5}} >5:00 AM - 11:59 AM </Checkbox>
      
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}} >12:00 PM - 5:59 PM</Checkbox>

      <p style={{fontWeight:'bold'}}>Stops</p>
      <Checkbox style={{width:'85%',marginBottom:5}}>Nonstop</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>1 Stop</Checkbox><span style={{fontSize:14}}>$230</span>
      <br/>
      <Checkbox style={{width:'85%',marginBottom:5}}>2+ Stops</Checkbox><span style={{fontSize:14}}>$230</span>


      <p style={{fontWeight:'bold'}}>Airlines Included</p>
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
