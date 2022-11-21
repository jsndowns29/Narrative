import React from "react"
import { Link } from 'react-router-dom';
import '../styles.css' 


export default function Navbar() {
    
  return <div id="navbar">

      <div id="nav-container">
        <Link className="nav-links" to="/">Datasets</Link>
        <Link className="nav-links" to="/buyorder">Buy Order</Link>
      </div>

      <div id="nav-items">
       <nav>
         
      </nav>	
    </div>

  </div>
}
 