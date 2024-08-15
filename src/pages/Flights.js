
import '../assets/Flights.css';
import { useState, useEffect } from 'react';
import * as React from 'react';
import planeIcon from '../images/plane_icon.png';
import dealIcon from '../images/deal_icon.png';
import discoverIcon from '../images/discover_icon.png';
import hearthIcon from '../images/hearth.png';
import StarRating from '../components/StarRating'; 
import { Select, Button,Dropdown} from 'antd';
import { DownOutlined , InfoCircleTwoTone} from '@ant-design/icons';
import { DatePicker, Space } from 'antd';


import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Flights() {
    const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
        const fetchFlights = async () => {
          try {
            const response = await fetch('http://localhost:5001/api/flights');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFlights(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFlights();
      }, []);
    const sortitems = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    1st menu item
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    2nd menu item
                </a>
            ),
            key: '1',
        },
        
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    3nd menu item
                </a>
            ),
            key: '3',
          
        },
    ];
    const items = [
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    1st menu item
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    2nd menu item
                </a>
            ),
            key: '1',
        },
        
        {
            label: (
                <a target="_blank" rel="noopener noreferrer" href="#">
                    3nd menu item
                </a>
            ),
            key: '3',
          
        },
    ];




    return (

        <div className="flightsPage" >
            <div className='flightsPageContainer'>
                <div className='headerFlights'>
                    <div className='headerLeftFlights'>
                    <img src={planeIcon} className='planeIcon' alt='plane icon'></img>
                    <b className='headerText'>PLANE SCAPE</b>
                    </div>
                    <div className='headerMidFlights'>
                    <Button className='buttonHeader'>Times</Button>
                        <Button className='buttonHeader'>Stops</Button>
                        <Button className='buttonHeader'>Airlines</Button>
                        <Button className='buttonHeader'>Airports</Button>
                        <Button className='buttonHeader'>Amenities</Button>
                        <Dropdown
                            
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{color:'rgb(56,117,246)'}}>
                                    Edit Search
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <div className='rightHeaderFlights'>
                    <StarRating style={{width:100}} />
                    <div className='vr'></div>
                    <StarRating style={{width:100}} />
                    <div className='vr'></div>
                    <StarRating style={{width:100}} />
                    <div className='vr'></div>
                    <StarRating style={{width:100}} />
                    <div className='vr'></div>
                    <StarRating style={{width:100}} />
                    
                    </div>

                </div>
                
                <div className='flightPageContent'>
                    <div className='contentHeader'>
                    <div className='contentHeaderLeft'>
                        <span style={{fontSize:15,}}>Sort by: </span><Dropdown
                            
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space style={{color:'black',fontWeight:'bold'}}>
                                    Recommended
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>


                        </div>
                        <div className='contentHeaderRight'>
                        <InfoCircleTwoTone style={{marginRight:10}}color='blue' />
                        <span>Avg Fare:</span><b>$225</b>
                        </div>

                    </div>
                    {flights.map((flight) => (
                        <div className='contentMyFlights'>
                  
                  <div className='leftContentMyFlights'>
                  <div className='timeContent'>
                  <img src={hearthIcon} style={{marginRight:20,width:30,height:30}}alt="hearth icon"/>
                  <span className='timeText'>{flight.departureTime}<hr style={{marginRight:10,marginLeft:10,width:10,backgroundColor:'black'}}/>{flight.arrivalTime}</span>
                  </div>
                 
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

                  
                  <div className='myFlightsDetails'>
                      
                      <span>{flight.departureName}</span>
                  <Dropdown
                      
                      menu={{
                          items,
                      }}
                  >
                      <a onClick={(e) => e.preventDefault()}>
                          <Space style={{color:'rgb(56,117,246)'}}>
                              Edit Search
                              <DownOutlined />
                          </Space>
                      </a>
                  </Dropdown>
                      
                      
                 
                  </div> 
                  <div className='myFlightsDetails'>
                      
                      <span>Nonstop</span>
                      <span style={{marginTop:2,fontSize:14,color:'gray'}}>{flight.arrivalTime}</span>
                      
                      
                 
                  </div> 
                  <div className='myFlightsDetails'>
                      
                      <span>{flight.arrivalName}</span>
                      <span style={{marginTop:2,fontSize:14,color:'gray'}}>unknown</span>
                      
                      
                      
                 
                  </div> 
                  </div>
                  
                  </div>
            
                  
                  <div className='rightContentMyFlights'>
                  
                 
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <div className='cart'>
                  <p className='price'>$156</p>
                  <span className='ticketType'>Main</span>
                  </div> 
                  <div className='cart'>
                  <p className='price'>$204</p>
                  <span className='ticketType'>Comfort+</span>
                  </div> 
                  <div className='cartdisable'>
                  
                  </div> 
                  <div className='cart'>
                  <p className='price'>$386</p>
                  <span className='ticketType'>Delta One</span>
                  </div> 
                  <div className='cartdisable'>
                  
                  </div> 
                  </div>
                  </div>
                  
              </div>
                    ))}
                    
                    
                </div>
            </div>



        </div>

    );
}

export default Flights;
