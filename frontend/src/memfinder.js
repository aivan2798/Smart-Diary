import React, { useRef, useState, useCallback } from "react";
import "./csmemfinder.css";
import { TextField, TextareaAutosize } from "@mui/material";
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

function MemoBox(mem_props){
    const mem_txt = mem_props.text;
    
    return(
        <div className="xmembox">
            {mem_txt}
        </div>
    );

}


export default function FindMemUI() {

    
    let [new_mem, saveMem] = useState();
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
    
       saveMem(<div></div>);
       //alert(memories);
       memories.push(<MemoBox text="oops"/>);
       //saveMem(true);
    },[saveMem]);
    
    //memories.push(new_mem);
    return (
    
    <div className = "mem_recall">
        <table>
            <thead><b>RECALL YO MEMORIES</b></thead>


            <tr>
                <td>
                    <div className="mem_outs">
                        {memories}
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                 
                    <textarea className="mem_input" placeholder="what do you want to remember?"></textarea>
                </td>
            </tr>
            <tr>
            <td>
                <center>
                <button className="findMemButton" onClick={memSaver}>
                    SEARCH MEMORY
                </button>
                </center>
                </td>
            </tr>
        </table>
    </div>
    );

}
