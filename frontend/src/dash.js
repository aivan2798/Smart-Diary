import logo from './logo.svg';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
//import './App.css';
//import './dash.css';
import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material-next/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import ReactLoading from 'react-loading'
import { end_point } from './constants';
//"https://cdn.skypack.dev/react-loading@2.0.3";

function xrandom(max) {
    return Math.floor(Math.random() * (max + 1));
  }

function XSnowflakes() {
    const snowflakes = [];
  
    for (let i = 1; i <= 200; i++) {
      const size = `${xrandom(1) * 0.2}vw`;
      const leftIni = `${xrandom(20) - 10}vw`;
      const leftEnd = `${xrandom(20) - 10}vw`;
      const left = `${xrandom(100)}vw`;
      const animationDuration = `${5 + xrandom(10)}s`;
      //const animationDelay = `-${xrandom(10)}s`;
  
      const snowflakeStyle = {
        '--size': size,
        '--left-ini': leftIni,
        '--left-end': leftEnd,
        left: left,
        animation: `snowfall ${animationDuration} linear infinite`,
        //animationDelay: animationDelay,
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


async function xpostData(data,setData)
{
  const xurl = end_point;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
  const url = xurl;
  
  try {
    const response = await fetch(url, requestOptions);
    const xresponseData = await response.json();
    const responseData = {"loader_on":false,"show_ans":true,"content":xresponseData["content"]};
    setData(responseData); // Store response data in state or do something with it
  } catch (error) {
    console.error('Error:', error);
    const responseData = {"loader_on":false,"show_ans":true,"content":"Error in Request"};
    setData(responseData);
  }
}

function AnswerSheet(answers_prop)
{
  const ans = answers_prop.answers;
  const answer_type = ans["loader_on"];

  if(answer_type==true)
  {
    return(
      <div className="loaderIcon_box">
         <ReactLoading type="bars" color="#03fc4e" height='5%' width='10%'/><br/>
      </div>
    );
  }
  else
  {
    const msg = ans["content"];
    return(
    <div className='answers_box'>
      {msg}
    </div>
    );
  }
}

export default function Dash(user_data) {

    const usr = user_data.usr;
    const nickname = "aivo";
    //usr["name"];

    const nickRef = useRef();
    const titleRef = useRef();
    const dataRef = useRef();
    const tagsRef = useRef();
    const qtnRef = useRef();
    const [showSearch,switchSearch] = useState(false);
    const [answer_data,setLoader] = useState({"loader_on":false,"show_ans":false,"content":"hello, my friend, your answers will be here"});
//1924
   

    
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
      setLoader({"loader_on":true,"show_ans":false,"content":"connecting..."})
      const mnick_name = nickname;
      //nickRef.current.value;
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
      xpostData(content,setLoader);
     };
  
  
     const buffFxx = ()=>
     {
      setLoader({"loader_on":true,"show_ans":false,"content":"connecting..."})
      //const mnick_name = nickRef.current.value;
      const mdata = qtnRef.current.value;
      const mtags = tagsRef.current.value;
  
      const xcontent = {
        "query":mdata,
        "tags":mtags
      };
      
      const content =  {
        "cmd":"buff_mem",
        "content":xcontent
    };
      //alert(JSON.stringify(content));
      xpostData(content,setLoader);
     };
     


    //<RocketLaunchIcon className="spaceShuttle"/>
    //      <StarIcon className="nebulae"  style={{width:"1vw",height:"1.5vh"}}/>
    //<header className="App-header">
    //</header>
    /*
     <!--div className="memories_container">
          hello<br/>
          yes sar
        </div-->
        <input className="dnickbox" ref={nickRef} type="text" placeholder="add your nickname"/><br/>
        */
     //   <div className = "log_msg"> This is A Test error message</div>
      //  <ReactLoading type="bars" color="#03fc4e" height='10%' width='10%'/><br/>
      //<textarea className="membox" type="text" placeholder="Answers here !!!!" value={ans}></textarea><br/><br/>
    return (
  
      //
      <div className="App">
         
        <div className="wrapper">
          <div className="typing-demo">
            HELLO ASTRO {nickname} <br/>
          </div>
        </div>
        
        
        <br/>
        
        
        <div className="memory_table">
        
            <Button className="searchbutton" color="primary" variant="filled"  onClick={searchFxx}  style={{display: showSearch ? 'none': 'block' }}>search memory<SearchIcon className="searchicon"/></Button>
            <Button className="addbutton" onClick={addFxx} color="primary" variant="filled" style={{display: showSearch ? 'block': 'none' }}>ADD MEMORY<ControlPointIcon className="searchicon" /></Button>
            <br/>
            <AnswerSheet answers={answer_data}/><br/><br/>
            <div className = 'searchbox' style={{display: showSearch ? 'block': 'none' }}>
                <textarea className="membox" ref={qtnRef} type="text" placeholder="What do you recall about the memory !!!!"></textarea><br/><br/>
                <input className="tagsbox" ref={tagsRef} type="text" placeholder="add any tags here you recall e.g #beautifulangels"/><br/>
                <div className="addmem_ctn"><Button className="addmembtn" color="primary" variant="filled" onClick={buffFxx}>FIND MEMORY &nbsp;<SearchIcon/></Button></div>
            </div>

            <div className='adderbox' style={{display: showSearch ? 'none': 'block' }}>
            
                  <input className="memheaderbox" type="text" placeholder="Memory Title" ref={titleRef}/>
                  <textarea className="membox" type="text" placeholder="Whats the memory !!!!" ref={dataRef}></textarea>
                  <input className="tagsbox" type="text" placeholder="add any tags here e.g #beautifulangels" ref={tagsRef}/>
                  <div className="addmem_ctn"><Button className="addmembtn" color="primary" variant="filled"  onClick={saveFxx}>SAVE MEMORY &nbsp;<ControlPointIcon/></Button></div>
        </div>
        </div>
      </div>
    
    );
    
  }

  //export default Dash();