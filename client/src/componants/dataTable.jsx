import React,{useEffect, useState} from 'react'
import './dataTable.css';
import Img1 from '../assets/download (1).jpeg';
import Img2 from '../assets/image(1).png';
import Img3 from '../assets/OIP.jpeg';
import Img4 from '../assets/OIP (6).jpeg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import FindDate from './FindDate';
import Cookies from 'js-cookie';
import '../Account_Pages/Recentreply.css';
import { jwtDecode } from 'jwt-decode';

export const DataTable = ({searchh}) => {
  
  // const [username,setUsername]=useState('');
  // const [email,setEmail]=useState('');
  const [languges,setLanguges]=useState();
  const search=searchh;


let email,username;
    
const jwt_token=Cookies.get('token');
if(jwt_token) {
  const decode_payload=jwtDecode(jwt_token);
  email =decode_payload.email
  username= decode_payload.username;

}

  const [posts,setPosts]=useState([]);
  let clastpost=[''],pylastpost=[''],javalastpost=[''],uilastpost=[''];


  let clastpostDate=[''],clastpostTime=[''],pylastpostDate=[''],pylastpostTime=[''],javalastpostDate=[''],javalastpostTime=[''],uilastpostDate=[''],uilastpostTime=['']
  let c_count=0;
  let py_count=0;
  let java_count=0;
  let ui_count=0;

  let showdate=new Date()

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
  const [currentHours,currentMinutes,currentsec]=displayTime.split(':');

  let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
  let arr3=[Number(currentHours),Number(currentMinutes)];
  let arr2=[];
  let arr4=[];
  let date,time,a,b,c,d;
  let [fetchDate,fetchMonth,fetchYear]=['','',''];
  let [Hours,Minutes,seconds]=['','','']


  useEffect(()=>{

    axios.get('http://localhost:2000/posts')
    .then((res) => {
      setPosts(res.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
 

  useEffect(()=>{

      axios.get('http://localhost:2000/getLanguages')
      .then((res) => {
        setLanguges(res.data);
        // console.log("Languages :",res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  },[])


  {posts.map((value,index)=>{
    <div key={index}></div>
   
    if(value.language==='C'){
          c_count++;
          
          
          [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
          [Hours, Minutes] = value.time.split(':');
          
          clastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
          clastpostTime=[Number(Hours), Number(Minutes)];
          
          clastpost=([value.username, value.email, value.date, value.time,value.id,value.language,value.level]);
      }
    if(value.language==='Python'){
          py_count++;
          
          [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
          [Hours, Minutes] = value.time.split(':');
          
          pylastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
          pylastpostTime=[Number(Hours), Number(Minutes)];
          
          pylastpost=([value.username, value.email, value.date, value.time,value.id,value.language,value.level]);
      }
    if(value.language==='Java'){
          java_count++;
          
          [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
          [Hours, Minutes] = value.time.split(':');
          
          javalastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
          javalastpostTime=[Number(Hours), Number(Minutes)];
          javalastpost=([value.username, value.email, value.date, value.time,value.id,value.language,value.level])
      }
    if(value.language==='UIUX'){
          ui_count++;
          
          [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
          [Hours, Minutes] = value.time.split(':');
          
          uilastpostDate=[Number(fetchDate), Number(fetchMonth), Number(fetchYear)];
          uilastpostTime=[Number(Hours), Number(Minutes)];
          uilastpost=([value.username, value.email, value.date, value.time,value.id,value.language,value.level])
      }
  })}

arr2=clastpostDate;
arr4=clastpostTime;

a=FindDate({ arr2:arr2 ,arr4:arr4 });

arr2=pylastpostDate;
arr4=pylastpostTime;


b=FindDate({ arr2:arr2 ,arr4:arr4 });

arr2=javalastpostDate;
arr4=javalastpostTime;

c=FindDate({ arr2:arr2 ,arr4:arr4 });

arr2=uilastpostDate
arr4=uilastpostTime;

d=FindDate({ arr2:arr2 ,arr4:arr4 });

  
let Datas=[ {"skill":"C Program", "level":4, "posts":c_count, "lastpost_time":a,"lastpost_name":clastpost[0],"lastpost_email":clastpost[1] ,"lastpost_id":clastpost[4] ,"lastpost_lang":clastpost[5] ,"lastpost_level":clastpost[6] ,"url":"C"} ,
            {"skill":"Python", "level":4, "posts":py_count, "lastpost_time":b,"lastpost_name":pylastpost[0] ,"lastpost_email":pylastpost[1],"lastpost_id":pylastpost[4] ,"lastpost_lang":pylastpost[5] ,"lastpost_level":pylastpost[6] ,"url":"Python" },
            {"skill":"Java", "level":4, "posts":java_count, "lastpost_time":c,"lastpost_name":javalastpost[0],"lastpost_email":javalastpost[1],"lastpost_id":javalastpost[4] ,"lastpost_lang":javalastpost[5] ,"lastpost_level":javalastpost[6] ,"url":"Java" },
            {"skill":"UI UX", "level":4, "posts":ui_count, "lastpost_time":d,"lastpost_name":uilastpost[0] ,"lastpost_email":uilastpost[1],"lastpost_id":uilastpost[4] ,"lastpost_lang":uilastpost[5] ,"lastpost_level":uilastpost[6] ,"url":"UIUX" }
          ]

  return (
    <div className='maintable'>
      <table className='bodytable'>
     
     <thead>
         <tr>
             <th className='pskillshead' >PS Skills</th>
             <th className='levpostshead' >Levels</th>
             <th className='levpostshead'>Posts</th>
             <th className='pskillslastpost' >Last Post</th>
         </tr>
     </thead>
     <tbody> 
     

     {Datas.filter((item)=>{
       
       return search.toLowerCase === ''?
       item: item.skill.toLowerCase().includes(search.toLowerCase());

     }).map((item,i)=>{
       return(
       <tr>
             <td className='pskills'><Link to={`/${item?.url}`}> {item?.skill}</Link></td>
           
       
             <td className='levposts'>{item?.level}</td>
             <td className='levposts'>{item?.posts}</td>
          
             <td className='lastpost'>
                  
                  {item.lastpost_time !="NaNYears ago"? <ul className='lapost-list'>
                 
                   <li className='lapost-date'> 
                      <NavLink to={`/${item?.lastpost_lang}/${item?.lastpost_level}/discussion?discussionId=${item?.lastpost_id}`}  style={{textDecoration:"none", color:" #00357d"}}>
                      {item?.lastpost_time} 
                      </NavLink>
                   </li>
                  
                    
                        <li className='lapost-author'>
                          
                          <NavLink to={`/Account?name=${item?.lastpost_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}>
                              <img src={Img1} alt='abc'/><span className='non-image'>{item.lastpost_name}</span>
                          </NavLink>  
                        </li>
                    
                  </ul>:  <ul> <li className='notposted'>{"No posts"}</li> <li className='notposted'>{"available !"}</li></ul> }     

            </td>

       </tr>
       
     )
        
     })}
               
     </tbody>
   </table>
    </div>
  )
}


