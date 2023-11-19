import React, {useState} from "react";
import Button from "@mui/material-next/Button";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ReactLoading from "react-loading";
import "./guis.css";
import { Input, TextField, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";


function SaveMemBtn()
{
   const [is_SM_clicked, changeSMClick] = useState(false);

   const smBtnClicked = ()=>{
    changeSMClick(!is_SM_clicked);
   };

   if (is_SM_clicked == false)
   {
   return(
    <Button variant="contained" color="secondary" onClick={smBtnClicked}>
        <div className="savemem_btn">
            SAVE MEMORY&nbsp;<ControlPointIcon/>
        </div>
    </Button>
   );
   } else {
    return (
        <Button variant="contained" color="secondary" onClick={smBtnClicked}>
         <div className="savemem_btn">
            SAVING...&nbsp;<ReactLoading type="bars" height={20} width={20}/>
         </div>
        </Button>
    );
   }
}


export default function SaveMemUI()
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
    return (
        
        <div className = "savemem_ui">
            <table>
                <thead><center><b>KEEP YOUR MEMORIES HERE</b></center></thead>
                <tr>
                    <td>
                        <input className="mem_title" placeholder="Enter Memory Title"/><br/>
                        
                    </td>
                </tr>
                <tr>
                    <textarea className="mem_body" placeholder="Write the memory content"></textarea>
                </tr>
                <tr>
                <input className="xxtagbox" placeholder="Enter any tags here"/>
                </tr>
                <tr>
                    <center>
                         <SaveMemBtn/>
                    </center>
                </tr>
            </table>
        </div>
        
    );
}

