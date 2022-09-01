import React from 'react'
import profileimg from '../../asset/user.png';
import {useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Alluser.css'
import axios from 'axios';

function Alluser() {
    const [all, setAll] = useState([]);


useEffect(() => {
    async function fetchTweets() {
    const response = await axios.get(`http://localhost:29769/api/v1.0/tweets/users/all`, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Authorization":""
 
      }
    });
  setAll(response.data);
  }
  fetchTweets();
}, []);

  return (
      <div>
     
    <div className="comp">
    <ul className="list-group mt-5 text-white">
        {all.map((dataPoint, index) => (
  <li className="list-group-item d-flex justify-content-between align-content-center" id="l1">
    
         	<div className="d-flex flex-row">
             <span><img src={profileimg} alt="profile" /></span>
             <div className="ml-2">
                 {'\n'}
                 <h5 className="mb-0">{dataPoint.username}</h5>
                 <div className="about">
                     <div className="fname">{dataPoint.firstName}</div>
                     <div className="lname">{dataPoint.lastName}</div>
                     
                     {'\n'}
                 </div>
             </div>
         </div>
         {'\n'}
         </li>
          
        ))}
        {'\n'}
       </ul>

      </div>
      </div>
  )
}

export default Alluser