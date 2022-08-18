import React from "react";
import { Link } from "react-router-dom";
import './styles/LandingPage.css'

export default function LandingPage(){
    return (
        <div className="landingPage">
        <div>
            <h1>Poke-Api</h1>
            <Link to='/home'><button>Home</button></Link>
        </div>
        </div>
    )
}