import React, { useRef, useState, useCallback } from "react";
import "./csmemfinder.css";
import Cookies from "universal-cookie";
import ReactLoading from "react-loading";
import { TextField, TextareaAutosize } from "@mui/material";
import ScrollToBottom from 'react-scroll-to-bottom';
import { FaBrain,FaFaceLaughBeam } from "react-icons/fa6";
import {ImPacman } from "react-icons/im";
import { BsWechat } from "react-icons/bs";
import { end_point } from "./constants";
let memories = [];

/*
export default function FindMemUI() {

    
    return (
    
    <div className = "mem_recall">
            <b>RECALL YO MEMORIES</b>
                
            <div className="mem_in_box">
                <table>
                <tr>
                <td>
                <textarea className="mem_input" placeholder="what do you want to remember?"></textarea>
                </td>
                <td>
                <button className="findMemButton">
                    SEARCH MEMORY
                </button>
                </td>
                </tr>
                </table>
            </div>
        
    </div>
    );

}
*/

async function xpostData(data,setData)
{
  //const xurl = "/";
  const xurl = end_point;
  
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
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
    //setData(false);
    const mem_txt = xresponseData["content"];
    memories.push(<ReplyBox text={mem_txt}/>);
    setData(false); // Store response data in state or do something with it
  } catch (error) {
    console.error('Error:', error);
    const responseData = {"loader_on":false,"show_ans":true,"content":"Error in Request"};

    const mem_txt = responseData["content"];
    memories.push(<MemoBox text={mem_txt}/>);
        //responseData["content"]);
    setData(false);
    //setData(false);
  }
}



function FindMemBtn(btn_props) {
    
   const ans_state = btn_props.ans_state;
   const memSaver = btn_props.onClick;
 
    if (ans_state == false)
    {
    return(
     
     <button className="findMemButton" onClick={memSaver}>
                    ?<BsWechat/>
    </button>
     
    );
    } else {
     return (
         
        <button className="findMemButton" onClick={memSaver}>
             <ReactLoading type="bars" height={35} width={35}/>
         </button>
     );
    }
 }



function MemoBox(mem_props){
    const mem_txt = mem_props.text;
    
    return(
        <div className="xmembox">
            <FaFaceLaughBeam/>&nbsp;&nbsp;{mem_txt}
        </div>
    );

}

function ReplyBox(mem_props){
    const mem_txt = mem_props.text;
    
    return(
        <div className="replymembox">
            <FaBrain/>&nbsp;&nbsp;<div>{mem_txt}</div>
        </div>
    );

}


export default function FindMemUI() {

    
    let [ans_state, saveMem] = useState(false);
    const ask_ref = useRef();
    //const mem_outs_ref = useRef();

    //mem_outs_ref.current?.scrollIntoView({behavior:"smooth",block:"end"});
    /*
    const memSaver = ()=>{
        //memories.current.push
       saveMem(<div>heppo</div>);
       //memories.push(<div>heppo</div>);
       //saveMem(true);
    };
*/
    const memSaver = useCallback(()=>{
        //memories.current.push
       const ask_text = ask_ref.current.value;
       
       const cookie = new Cookies().get("memory_token");
       const xcontent = {
        "memory_token": cookie,
        "query":ask_text,
        "tags":""
      };
      
      const content =  {
        "cmd":"buff_mem",
        
        "content":xcontent
        };

       

       //alert(memories);
       memories.push(<MemoBox text={ask_text}/>);
       saveMem(true);

       xpostData(content,saveMem);
       //saveMem(true);
    },[saveMem]);
    
    //memories.push(new_mem);
    return (
    
    <div className = "mem_recall">
        <center><b>RECALL YO MEMORIES</b></center>
        <ScrollToBottom className="mem_outs">
        {memories}
        </ScrollToBottom>
        <div className="buttom_in">
        <textarea className="mem_input" placeholder="what do you want to remember?" ref={ask_ref}></textarea><br/>
        <FindMemBtn onClick={memSaver} ans_state={ans_state}/>
                    
        </div>
    </div>
    );

}
/*<button className="findMemButton" onClick={memSaver}>
SEARCH MEMORY
</button>
*/

function XFindMemUI() {

    
    let [ans_state, saveMem] = useState(false);
    const ask_ref = useRef();
    /*
    const memSaver = ()=>{
        //memories.current.push
       saveMem(<div>heppo</div>);
       //memories.push(<div>heppo</div>);
       //saveMem(true);
    };
*/
    
    const memSaver = useCallback(()=>{
        //memories.current.push
       const ask_text = ask_ref.current.value;
       const cookie = new Cookies().get("memory_token");
       
       const xcontent = {
        "memory_token": cookie,
        "query":ask_text,
        "tags":""
      };
      
      const content =  {
        "cmd":"buff_mem",
        
        "content":xcontent
        };

       

       //alert(memories);
       memories.push(<MemoBox text={ask_text}/>);
       saveMem(true);

       xpostData(content,saveMem);
       //saveMem(true);
    },[saveMem]);
    
    //memories.push(new_mem);
    return (
    
    <div className = "mem_recall">
        <table className="mem_table">
            <thead><center><b>RECALL YO MEMORIES</b></center></thead>


            <tr>
                <td>
                    <div className="mem_outs">
                        {memories}
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                 
                    
                </td>
                <td>
                
                
                
                </td>
            </tr>
            <tr>
            <td>
                
                    
                
                </td>
            </tr>
        </table>
        <div className="buttom_in">
        <textarea className="mem_input" placeholder="what do you want to remember?" ref={ask_ref}></textarea><br/>
        <FindMemBtn onClick={memSaver} ans_state={ans_state}/>
                    
        </div>
    </div>
    );

}