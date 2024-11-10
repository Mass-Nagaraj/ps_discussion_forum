import React, { useEffect, useState } from 'react';

import { Footer } from '../componants/Footer';
import { DataTable } from '../componants/dataTable';
import Img1 from '../assets/download (1).jpeg'
import Img2 from '../assets/download.jpeg';
import Img5 from '../assets/image(1).png';
import Img4 from '../assets/OIP (6).jpeg';
import { Link, NavLink, useLocation, useResolvedPath } from 'react-router-dom';
import axios from 'axios';
import { FirstHeader, Header } from '../componants/Header';
import { Header1 } from '../componants/Header1';
import { Searchbar } from '../componants/Searchbar';
import FindDate from '../componants/FindDate';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../Account_Pages/Recentreply.css';


const Level = () => {

 
  const [questions,setQuestions] =useState([]);
  const location=useLocation();
  const [lastpost,setLastPost] =useState([]);
  let recentPosts,lastFiveRecentPosts;
  const [users,setUsers]=useState('');
  const [posts,setPosts]=useState('');
  const [search,setSearch]=useState('');

  const [reply_count,setReply_count]=useState([]);
  const [auth, setAuth] = useState('');
  let email,username;
    
  const jwt_token=Cookies.get('token');
  if(jwt_token) {
    const decode_payload=jwtDecode(jwt_token);
    email =decode_payload.email
    username= decode_payload.username;
    
  }
  
  Cookies.remove('Ac_select');
  // console.log("puss..",email,username)
    
  let path= window.location.pathname;
  const language=path?.split("/")[1];
 
  let level1_username=[''],level2_username=[''],level3_username=[''],level4_username=[''];
  let level1_email=[''],level2_email=[''],level3_email=[''],level4_email=[''];

  let level1lastpostDate=[''], level1lastpostTime=[''],level2lastpostDate=[''],level2lastpostTime=[''], level3lastpostDate=[''], level3lastpostTime=[''], level4lastpostDate=[''], level4lastpostTime=[''];

  let level1_count=0;
  let level2_count=0;
  let level3_count=0;
  let level4_count=0;
let level1Lastpost=[],level2Lastpost=[],level3Lastpost=[],level4Lastpost=[];


  
  let showdate=new Date()

  let displayTodaysDate=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
  let dt=showdate.toDateString()
  let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('/');
  const [currentHours,currentMinutes,currentsec]=displayTime.split(':');
  

  let arr1=[Number(currentDate),Number(currentMonth),Number(currentYear)];
  let arr3=[Number(currentHours),Number(currentMinutes)];
  let arr2,arr4,a,b,c,d;
  let level1_reply_count=0,level2_reply_count=0,level3_reply_count=0  ,level4_reply_count=0
  

useEffect(()=>{
  axios.post(`http://localhost:2000/${language}`,{
    language:language
  })
  .then((res)=>{
      setQuestions(res.data);
     
  }).catch((err)=>{
      console.log(err);
  })

},[]);


useEffect(()=>{
  axios.post("http://localhost:2000/getRecentReplies",{
    language:language
    
  }).then((res)=>{
    setLastPost(res.data);
     
  }).catch((err)=>{
    console.log(err);
    
  })
},[])
  
useEffect(()=>{
  axios.get("http://localhost:2000/users")
  .then((res)=>{
     setUsers(res.data);
  }).catch((err)=>{
    console.log(err);
  }) 
},[])

  useEffect(()=>{

    axios.get(`http://localhost:2000/posts/${language}`)
    .then((res)=>{
      setPosts(res.data);
    }).catch((err)=>{
      console.log(err);
    }) 
  },[])
    

  useEffect(()=>{

    axios.post('http://localhost:2000/getlang_reply',{
      language:language,
    })
    .then((res)=>{
      
      setReply_count(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[language])


lastFiveRecentPosts=lastpost.slice(-5).reverse();
recentPosts=lastFiveRecentPosts;
   
{reply_count?.map((value,index)=>{
  if(value.level=="Level1"){
    level1_reply_count++;
  }
  if(value.level=="Level2"){
    level2_reply_count++;
  }
  if(value.level=="Level3"){
    level3_reply_count++;
  }
  if(value.level=="Level4"){
    level4_reply_count++;
  }
})}

// console.log(lastpost)
  {lastpost?.map((value,index)=>{
    <div key={index}></div>
   
      if(value.level=== 'Level1'){
            level1_count++;
            level1_username=value.username
            level1_email=value.email;
           

            const [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
            const [Hours, Minutes] = value.time.split(':');
  
            level1lastpostDate=([Number(fetchDate), Number(fetchMonth), Number(fetchYear)]);
            level1lastpostTime=([Number(Hours), Number(Minutes)]);

            level1Lastpost=([value.username, value.email, level1lastpostDate, level1lastpostTime,value.id,value.level]);
          
        }
      if(value.level=== 'Level2'){
            level2_count++;
            level2_username=value.username
            level2_email=value.email
            const [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
            const [Hours, Minutes] = value.time.split(':');
  
            level2lastpostDate=([Number(fetchDate), Number(fetchMonth), Number(fetchYear)]);
            level2lastpostTime=([Number(Hours), Number(Minutes)]);

            level2Lastpost=([value.username, value.email, level2lastpostDate, level2lastpostTime,value.id,value.level]);
          
        }
      if(value.level=== 'Level3'){
            level3_count++;
            level3_username=value.username
            level3_email=value.email
            const [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
            const [Hours, Minutes] = value.time.split(':');
  
            level3lastpostDate=([Number(fetchDate), Number(fetchMonth), Number(fetchYear)]);
            level3lastpostTime=([Number(Hours), Number(Minutes)]);
            
            level3Lastpost=([value.username, value.email, level3lastpostDate, level3lastpostTime,value.id,value.level]);

        }
      if(value.level=== 'Level4'){
            level4_count++;
            level4_username=value.username
            level4_email=value.email
            const [fetchDate, fetchMonth, fetchYear] = value.date.split("/");
            const [Hours, Minutes] = value.time.split(':');
  
            level4lastpostDate=([Number(fetchDate), Number(fetchMonth), Number(fetchYear)]);
            level4lastpostTime=([Number(Hours), Number(Minutes)]);
            
            level4Lastpost=([value.username, value.email, level4lastpostDate, level4lastpostTime,value.id,value.level]);
        }
    })}


  arr2=level1lastpostDate
  arr4=level1lastpostTime
  
  a=FindDate({ arr2:arr2 ,arr4:arr4 });
  
  arr2=level2lastpostDate;
  arr4=level2lastpostTime;

  b= FindDate({ arr2:arr2 ,arr4:arr4 });

  
  arr2=level3lastpostDate
  arr4=level3lastpostTime
  
  c=FindDate({ arr2:arr2 ,arr4:arr4 });

  arr2=level4lastpostDate
  arr4=level4lastpostTime
  
  d= FindDate({ arr2:arr2 ,arr4:arr4 });
  
  let Datas=[ {"language":language, "level":"Level 1", "posts":level1_count, "replies":level1_reply_count, "lastpost_name":level1_username , "lastpost_email":level1Lastpost[1], "lastpost_date":a,"lastpost_id":level1Lastpost[4] , "url":`/${language}/Level1`} ,
              {"language":language, "level":"Level 2", "posts":level2_count, "replies":level2_reply_count, "lastpost_name":level2_username, "lastpost_email":level2Lastpost[1], "lastpost_date":b, "lastpost_id":level2Lastpost[4] ,"url":`/${language}/Level2` },
              {"language":language, "level":"Level 3", "posts":level3_count, "replies":level3_reply_count,"lastpost_name":level3_username , "lastpost_email":level3Lastpost[1],"lastpost_date":c, "lastpost_id":level3Lastpost[4] ,"url":`/${language}/Level3` },
              {"language":language, "level":"Level 4", "posts":level4_count,  "replies":level4_reply_count, "lastpost_name":level4_username , "lastpost_email":level4Lastpost[1], "lastpost_date":d, "lastpost_id":level4Lastpost[4] ,"url":`/${language}/Level4` },
            ]

  return (
    <div className='bodyy'>

       <FirstHeader searchh= {(data)=> setSearch(data)} content={`${language} Programming`} Languages={language} Levels={4} Posts= {posts.length} />

    <div className='content-body'>

    <div className='maintable'>
    <table className='bodytable'>
        <thead>
            <tr>
              <th className='pskillshead'>Levels</th>
              <th className='levpostshead'>Posts</th>
              <th className='levpostshead'>Replies</th>
              <th className='pskillslastpost'>Last Post</th>
            </tr>
        </thead> 
            <tbody>
            
            {Datas.filter((item,i)=>{
              return search.item ===''?
              item:item.level.toLowerCase().includes(search.toLowerCase());

              }).map((item,i)=>{
              return(
                <tr>
                        <td className='pskills'>
                            <Link to={item.url} > 
                                  {item.level}
                            </Link>
                        </td>
                
                    <td className='levposts'>{item.posts}</td>
                    <td className='levposts'>{item.replies}</td>
                    <td className='lastpost'>
                    
                        { item.lastpost_date !="NaNYears ago"? <ul className='lapost-list'>

                            <li className='lapost-date'> 
                                <NavLink to={`${item?.url}/discussion?discussionId=${item?.lastpost_id}`} style={{textDecoration:"none", color:" #00357d"}}>
                                    { item.lastpost_date } 
                                </NavLink>
                            </li>
                      
                        <li className='lapost-author'>
                            <NavLink to={`/Account?name=${item?.lastpost_email}`} style={{ textDecoration: 'none',  color: "#11297f" }}>
                              <img src={Img1} alt='abc'/> <span className='non-image'> {item.lastpost_name} </span>
                            </NavLink> 
                        </li>
                        
                        </ul>: <ul> <li className='notposted'>{"No posts"}</li> <li className='notposted'>{"available !"}</li></ul> }     

                  </td>

                </tr>
              )
            })}
            
        </tbody>
        
      </table>
    </div>
      

      <div className='recent-reply'>
        <h2>RECENT POSTS</h2>
        <table className='rr'>
        
        {recentPosts.map((value,index)=>{
            <div key={index}></div>
                const date=value.date;
                const [fetchDate,fetchMonth,fetchYear]=date.split("/");

                let arr2=[Number(fetchDate),Number(fetchMonth),Number(fetchYear)]
                let a;

                const time=value.time;
                const [Hours,Minutes,seconds]=time.split(':');
                let arr4=[Number(Hours),Number(Minutes)];
                a=FindDate({ arr2:arr2 ,arr4:arr4 });

                return(

                  
                <tr>
                      <td> <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                              <img src={Img1}></img> 
                          </NavLink></td>
                          
                      <td> <NavLink to={`/Account?name=${value.email}`} style={{ textDecoration: 'none',  color: "#11297f" }}> 
                            <b>{value.username}</b>
                          </NavLink> on<br/>
                      
                          <NavLink to={`/${language}/${value.level}/discussion?discussionId=${value.id}`}  style={{ textDecoration: 'none',  color: "#11297f" }}>
                    
                              {value.title}<br/>
                              {a}
                          </NavLink>
                      </td>
                    
                </tr>

                )
          })}
          
        </table>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default Level;
