import React, {useState} from "react"
import './xdash.css'
import SaveMemUI from "./guis";
import Cookies from 'universal-cookie';
import FindMemUI from "./memfinder";
import SaveURLUI from "./urltrackUI";
import MainBoard from "./welcome";
import {BrowserRouter,Route,Routes,Link, NavLink, Outlet} from "react-router-dom";
import { end_point } from "./constants";


let active_set;
//let active_token = '';
//let is_home;
function SaveMemPB(btn_props)
{
    const text_name = btn_props.text;
    let [is_save_mem, setSMState] = useState(false);
    if (active_set==null){
       // active_set(false);
       active_set = setSMState;
       setSMState(true);
     //  alert("null state");
     // is_save_mem = true;
      
    }
    
  // alert(is_save_mem);

    const saveMemUI = ()=>{

        if (active_set!=null){
            active_set(false);
           // alert("button null");
        }
        
        setSMState(true);
        active_set = setSMState;
       // setFMState((!is_find_mem));
       // setCTState((!is_crypto_track));
    }
    
    if (is_save_mem==true)
    {
    return (
        <button className="pressed_pushButton" onClick={saveMemUI}>
            {text_name}
        </button>
    );
    }
    else
    {
    return (
        <button className="pushButton" onClick={saveMemUI}>
            {text_name}
        </button>
    );
    }
}

function FindMemPB(btn_props)
{
    const text_name = btn_props.text;
    let [is_find_mem, setFMState] = useState(false);
    
    
    const findMemUI = ()=>{

        if (active_set!=null){
            active_set(false);
           // alert("not null");
        }
        
        setFMState(true);
        active_set = setFMState;
    }

    if (is_find_mem==true)
    {
    return (
        <button className="pressed_pushButton" onClick={findMemUI}>
            {text_name}
        </button>
    );
    }
    return (
        <button className="pushButton" onClick={findMemUI}>
            {text_name}
        </button>
    );
}

function CryptoTrackPB(btn_props)
{
    const text_name = btn_props.text;
    let [is_crypto_track, setCTState] = useState(false);


    const cryptoTrackUI = ()=>{

        if (active_set!=null){
            active_set(false);
        }
        
        setCTState(true);
        active_set = setCTState;
       // setFMState((!is_find_mem));
       // setCTState((!is_crypto_track));
    }

    if (is_crypto_track==true)
    {
    return (
        <button className="pressed_pushButton" onClick={cryptoTrackUI}>
            {text_name}
        </button>
    );
    }
    return (
        <button className="pushButton" onClick={cryptoTrackUI}>
            {text_name}
        </button>
    );
}

function URLTrackPB(btn_props)
{
    const text_name = btn_props.text;
    let [is_crypto_track, setCTState] = useState(false);


    const urlTrackUI = ()=>{

        if (active_set!=null){
            active_set(false);
        }
        
        setCTState(true);
        active_set = setCTState;
       // setFMState((!is_find_mem));
       // setCTState((!is_crypto_track));
    }

    if (is_crypto_track==true)
    {
    return (
        <button className="pressed_pushButton" onClick={urlTrackUI}>
            {text_name}
        </button>
    );
    }
    return (
        <button className="pushButton" onClick={urlTrackUI}>
            {text_name}
        </button>
    );
}

/*
function findMemUI(event_obj)
{
    alert("find gui");
}

function cryptoTrackUI(event_obj)
{
    alert("crypto track gui");
}
*/



function Layout()
{
    return (
        <div className="main_div">
        <center>
          <table>
            <thead></thead>
            <tr>
              <td>
                <NavLink to="savemem"><SaveMemPB text="SAVE MEMORY" /></NavLink>
              </td>
              <td>
                <NavLink to="findmem"><FindMemPB text="FIND MEMORY"/></NavLink>
              </td>
              <td>
                <NavLink to="urlTrack"><URLTrackPB text="URL TRACK SUM"/></NavLink>
              </td>
            </tr>
          </table><br/>
          <Outlet/>
        </center>
        </div>
    );
}


export default function Xdash(xuser_data)
{

    const active_json = xuser_data.usr;
    const active_token = new Cookies().get("memory_token");
    //active_json["memory_token"];
   // alert(active_token);
    
    return(
            <div>
            <Routes>
                <Route path ="/" element={<Layout/>}>
                   <Route index element={<MainBoard/>}/>
                   <Route path="savemem" element={<SaveMemUI/>}/>
                   <Route path="findmem" element={<FindMemUI/>}/>
                   <Route path="urlTrack" element={<SaveURLUI/>}/>
                </Route>
            </Routes>
            </div>
    );
}
