
import '../assets/Flights.css';
import { useState, useEffect } from 'react';
import * as React from 'react';
import planeIcon from '../images/plane_icon.png';
import dealIcon from '../images/deal_icon.png';
import discoverIcon from '../images/discover_icon.png';
import profileIcon from '../images/profile_icon.png';

import { Select, Button,Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';


import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Flights() {
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
                    <img src={dealIcon} className='rightIcon' alt='deal icon'></img>
                        
                    </div>
                </div>
            </div>



        </div>

    );
}

export default Flights;
