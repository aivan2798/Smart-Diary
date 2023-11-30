//import logo from './logo.svg';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import './App.css';
import './dash.css';
import React, {useEffect, useState, useRef} from 'react';
import Button from '@mui/material-next/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import Dash from './dash';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactLoading from 'react-loading';

import Cookies from 'universal-cookie';

import Xdash from './xdash'
import { end_point } from './constants';
//import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
//import { Client } from 'appwrite';
const xurl = end_point;
//const xurl = "/";
async function postLoginFx(data,setData)
{
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const url = xurl;
  
  //useNavigate(Dash);
  //return;
  
  try {
    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    const datum = responseData;
    //["content"];
    const rdatum = {"loader_on":false,"show_ans":false,"content":{"login":true,"msg":datum,"meta":{}}};
    //alert(datum["memory_token"]);
    const cookie = new Cookies();
    cookie.set("memory_token",datum["memory_token"],{path:'/'});
    setData(rdatum); // Store response data in state or do something with it
    //alert(cookie.get("memory_token"));
  } catch (error) {
    console.error('Error:', error);
  }
}

function AnimatedComponent() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
      let animationId;
      const duration = 1000; // Animation duration in milliseconds
      const startTime = performance.now();

      const animate = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const animationProgress = Math.min(1, elapsedTime / duration);

          // Update the progress
          setProgress(animationProgress);

          // Request the next animation frame if the animation is not complete
          if (animationProgress < 1) {
              animationId = requestAnimationFrame(animate);
          }
      };

      // Start the animation loop
      animationId = requestAnimationFrame(animate);

      // Clean up the animation loop when the component unmounts
      return () => {
          cancelAnimationFrame(animationId);
      };
  }, []);

  return (
      <div className='anime' style={{ marginLeft: `${progress * 100}%` }}>
          This component has a timed animation.
      </div>
  );
}


function Rocketship()
{

  const [count,setState] = useState(0);
  let vw = "1vw";

  //setInterval(setState(5),1000);
  useEffect = ()=>
  {
    vw = count+"vw";
  }
  
 // const styled = {marginLeft:"500vw"};
  return(
    <div>
        <RocketLaunchIcon className="spaceShuttle" style={{marginLeft:vw}}/>
    </div>
  );


}


function nickNameBox()
{
  return(
    <div>
    <input className="nickbox" type="text"/>
    </div>
  );
}

function Snowflakes() {
  const snowflakes = [];

  for (let i = 1; i <= 200; i++) {
    const size = `${random(1) * 0.2}vw`;
    const leftIni = `${random(20) - 10}vw`;
    const leftEnd = `${random(20) - 10}vw`;
    const left = `${random(100)}vw`;
    const animationDuration = `${5 + random(10)}s`;
    //const animationDelay = `-${random(10)}s`;

    const snowflakeStyle = {
      '--size': size,
      '--left-ini': leftIni,
      '--left-end': leftEnd,
      left: left,
      animation: `snowfall ${animationDuration} linear infinite`,
     // animationDelay: animationDelay,
    };

    snowflakes.push(
      <div key={i} className="snowflake" style={snowflakeStyle}></div>
    );
    /*snowflakes.push(
      <StarIcon className="snowflake" style={snowflakeStyle}/>
    );*/
  }

  return (
    <div>
      {snowflakes}
    </div>
  );
}

// Utility function to generate a random number
function random(max) {
  return Math.floor(Math.random() * (max + 1));
}


function LoginSheet(answers_prop)
{
 // alert("JSON.stringify(ans)");
  const ans = answers_prop.answers;
  
  const answer_type = ans["loader_on"];

  if(answer_type==true)
  {
    return(
      <div className="loaderIcon_box">
         <ReactLoading type="bars" color="#03fc4e" height='5%' width='10%'/>
      </div>
    );
  }
  else
  {
    const msg = ans["content"]["msg"];
    return(
    <div className='answers_box'>
      {msg}
    </div>
    );
  }
}

function Heada()
{
  return (
    <div className='header_tag'>
    
      <b>OPEN YO SMART DIARY</b>
    </div>
  );
}

function XApp() {
  
  //<RocketLaunchIcon className="spaceShuttle"/>
  //      <StarIcon className="nebulae"  style={{width:"1vw",height:"1.5vh"}}/>
  //<header className="App-header">
  //</header>
  //const [user_data,setUsr] = useState({});
  const nickname_ref = useRef(null);
  const password_ref = useRef(null);
  //const [enavigate,setNavigate] = useState(true);
  const [answer_data,setLoader] = useState({"loader_on":false,"show_ans":false,"content":{"login":false,"msg":"","meta":{}}});

  const loginFx = ()=>{
    setLoader({"loader_on":true,"show_ans":false,"content":{"login":false,"msg":"hello darkness my old friend"}});
    const nickname_str = nickname_ref.current.value;
    const password_str = password_ref.current.value;

    const login_json = {
      "cmd":"eat_user",
      "content": {
        "nickname":nickname_str,
        "secret":password_str
      }
    };
    

    const json_str = JSON.stringify(login_json);
    //setNavigate(false);
    //setUsr({"name":nickname_str});
   // alert(json_str);
   //setLoader({"loader_on":true,"show_ans":false,"content":{"login":true,"msg":"login success","meta":{"name":nickname_str}}});
    postLoginFx(login_json,setLoader);
  };

  const enavigate = answer_data["content"]["login"];
 
  
  if(!enavigate)
  {
  
  return (


    <div className="App">
      <div className="wrapper">
        <div className="typing-demo">
          Welcome to the Memory Lane ........
        </div>
      </div>
     <div className="login_table">
    
      
  
      <Heada/>
      
      
        <div className="login_container">
            <LoginSheet answers={answer_data}/>
            <br/><br/>
            <input className="nickbox" ref={nickname_ref} type="text" placeholder="input your unique name"/><br/>
            <input className="codebox" ref={password_ref} type="password" placeholder="input your secret passphrase"/><br/><br/>
            <div className="login_ctn"><Button className="signupbtn" color="primary" variant="filled" onClick={loginFx}>HAIL ABOARD</Button></div>
      </div>
      

      
      
      </div>
    </div>
  );

   //<Snowflakes/>
  }
  
  
  

  const user_data = answer_data["content"]["msg"]; 
  //answer_data["content"]["meta"];
  return(<Xdash usr={user_data}/>);
  //return (<Xdash/>);
}


function searchFx()
{
  alert("searching");
}

/*
function App() {
  const nickRef = useRef(null);
  const titleRef = useRef(null);
  const dataRef = useRef(null);
  const tagsRef = useRef(null);
  const qtnRef = useRef(null);
  const [showSearch,switchSearch] = useState(false);

  const [ans,showAns] = useState("");
 // alert(showSearch);
   const searchFxx = ()=>
   {
    //searchFx();
    switchSearch(true);
   };

   const addFxx = ()=>
   {
    switchSearch(false);
   };

   const replies = (data)=>
   {
      alert(data["msg"]);
   };

   const dataFill = (data)=>
   {
      showAns(data["msg"])
   };

   const saveFxx = ()=>
   {
    const mnick_name = nickRef.current.value;
    const mtitle = titleRef.current.value;
    const mdata = dataRef.current.value;
    const mtags = tagsRef.current.value;

    const xcontent = {
      "nick_name":mnick_name,
      "title":mtitle,
      "content":mdata,
      "tags":mtags
    };

    const content =  {
        "cmd":"eat_mem",
        "content":xcontent
    };
    
    //alert(JSON.stringify(content));
    postData(content,replies);
   };


   const buffFxx = ()=>
   {
    const mnick_name = nickRef.current.value;
    const mdata = qtnRef.current.value;
    const mtags = tagsRef.current.value;

    const xcontent = {
      "nick_name":mnick_name,
      "query":mdata,
      "tags":mtags
    };
    
    const content =  {
      "cmd":"buff_mem",
      "content":xcontent
  };
    //alert(JSON.stringify(content));
    postData(content,dataFill);
   };
  //<RocketLaunchIcon className="spaceShuttle"/>
  //      <StarIcon className="nebulae"  style={{width:"1vw",height:"1.5vh"}}/>
  //<header className="App-header">
  //</header>
  //
//   <!--div className="memories_container">
 //       hello<br/>
  //      yes sar
   //   </div-->
      
  return (

    //
    <div className="App">
       
      <div className="wrapper">
        <div className="typing-demo">
          HELLO ASTRO <br/>
        </div>
      </div>
      <br/>
      <input className="dnickbox" ref={nickRef} type="text" placeholder="add your nickname"/><br/>
      <div className="login_container">
      <SearchIcon className="searchicon" onClick={searchFxx} style={{display: showSearch ? 'none': 'block' }}/>
      <ControlPointIcon className="searchicon" onClick={addFxx} style={{display: showSearch ? 'block': 'none' }}/><br/>

      <div className = 'searchbox' style={{display: showSearch ? 'block': 'none' }}>
          <textarea className="membox" type="text" placeholder="Answers here !!!!" value={ans}></textarea><br/><br/>
          <textarea className="membox" ref={qtnRef} type="text" placeholder="What do you recall about the memory !!!!"></textarea><br/><br/>
          <input className="tagsbox" ref={tagsRef} type="text" placeholder="add any tags here you recall e.g #beautifulangels"/><br/>
          <div className="addmem_ctn"><Button className="addmembtn" color="primary" variant="filled" onClick={buffFxx}>FIND MEMORY &nbsp;<SearchIcon/></Button></div>
      </div>
      <div className='adderbox' style={{display: showSearch ? 'none': 'block' }}>
          <input className="memheaderbox" type="text" placeholder="Memory Title" ref={titleRef}/><br/>
          <textarea className="membox" type="text" placeholder="Whats the memory !!!!" ref={dataRef}></textarea><br/><br/>
          <input className="tagsbox" type="text" placeholder="add any tags here e.g #beautifulangels" ref={tagsRef}/><br/>
          <div className="addmem_ctn"><Button className="addmembtn" color="primary" variant="filled"  onClick={saveFxx}>SAVE MEMORY &nbsp;<ControlPointIcon/></Button></div>
      </div>
      </div>

      <Snowflakes/>
      Yes
    </div>
  );
}
*/

export default XApp;
//XApp;
