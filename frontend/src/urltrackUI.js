import React, {useState, useRef} from "react";
import Button from "@mui/material-next/Button";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReactLoading from "react-loading";
import "./guis.css";
import { Input, TextField, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Cookies from 'universal-cookie';
import { end_point } from "./constants";


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
    setData(responseData); // Store response data in state or do something with it
  } catch (error) {
    console.error('Error:', error);
    const responseData = {"loader_on":false,"show_ans":true,"content":"Error in Request"};
    setData(responseData);
    //setData(false);
  }
}

function MemStatus(mem_stat_props) {

    const show_msg = mem_stat_props.text;
    return (
        <div className="mem_status"><div className="mem_msg">{show_msg}</div></div>
    );
    
}

function SaveURLBtn(btn_props) {
   const [is_SM_clicked_body, changeSMClick] = useState({"loader_on":false,"show_ans":true,"content":''});
   //useState(false);
   
   const ref_body = btn_props.body;
   const show_msg = is_SM_clicked_body["content"];;

   const is_SM_clicked = is_SM_clicked_body["loader_on"];
   const smBtnClicked = ()=>{
    
    changeSMClick(!is_SM_clicked);

      
      const mdata = ref_body.current.value;
    

     
      const active_token = new Cookies().get("memory_token");
      const xcontent = {
        "memory_token": active_token,
        "nick_name":"mnick_name",
        "title":"URL",
        "content":mdata,
        "tags":''
      };
  
      const content =  {
          "cmd":"eat_url",
          "content":xcontent
      };
      
      //alert(JSON.stringify(content));
      xpostData(content,changeSMClick);
   };

   if (is_SM_clicked == false)
   {
   return(
    <div>
    <MemStatus text={show_msg}/>
    <Button variant="contained" color="secondary" onClick={smBtnClicked}>
        <div className="savemem_btn">
            SAVE MEMORY&nbsp;<ControlPointIcon/>
        </div>
    </Button>
    </div>
   );
   } else {
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={smBtnClicked}>
         <div className="savemem_btn">
            SAVING...&nbsp;<ReactLoading type="bars" height={20} width={20}/>
         </div>
        </Button>
        </div>
    );
   }
}


export default function SaveURLUI()
{

    /*const theme = createTheme({
        palette: {
          ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
          },
        },
      });
      */


    const dataRef = useRef();


    const mnick_name = "nickname";

    const [answer_data,setLoader] = useState({"loader_on":false,"show_ans":false,"content":"hello, my friend, your answers will be here"});

    const saveFxx = ()=>
     {
      setLoader({"loader_on":true,"show_ans":false,"content":"connecting..."})
      
      //nickRef.current.value;
      
      const mdata = dataRef.current.value;
      

     
  
      const xcontent = {
        "nick_name":"mnick_name",
        "title":"title",
        "content":mdata,
        "tags":"url"
      };
  
      const content =  {
          "cmd":"eat_mem",
          "content":xcontent
      };
      
      //alert(JSON.stringify(content));
      xpostData(content,setLoader);
     };

    let this_date = new Date();
    let hour = this_date.getHours();
    let minute = this_date.getMinutes();



    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      
      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;

    return (
        
        <div className = "savemem_ui">
            
            <table>
                <thead><center>KEEP YOUR URL MEMORIES HERE INSTANTLY</center></thead><br/>
                <tr>
                <td>
                <input className="xxtagbox" placeholder="Paste the URL HERE" ref={dataRef}/>
                </td>
                <td>
                    
                </td>
                </tr>
                <tr>
                    <center>
                         <SaveURLBtn body={dataRef}/>
                    </center>
                </tr>
            </table>
        </div>
        
    );
}

