import React from "react";
import "./welcome.css";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { FaBrain } from "react-icons";

export default function MainBoard(){


    return(
        <div className="main_board">
            <div className="welcome_txt">WELCOME HOME ASTRO .....</div>
            <AcUnitIcon className="falling_skies" fontSize="large"/><AcUnitIcon className="falling_skies" fontSize="large"/><AcUnitIcon className="falling_skies" fontSize="large"/><AcUnitIcon className="falling_skies" fontSize="large"/>
            <br/>
            <div className="truck_div">
            *<AgricultureIcon className="truck_icon" fontSize="large"/>*
            </div>
            <div className="intro_div">
            This is a smart diary that helps you instantly recall your memories.<br/>
            Use the push buttons above to navigate through the different controls the diary has to offer.
            </div>
        </div>
    );
}