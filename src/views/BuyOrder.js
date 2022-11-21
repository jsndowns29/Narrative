import React from "react"
import BuyOrderGrid from "../components/BuyOrderGrid.js"
import CountriesSelector from '../components/CountriesSelector.js';
import { useNavigate } from 'react-router';
import '../styles.css' 


export default function BuyOrder({buyOrders, selectedCountries, toggleSelectedCountries, datasets, countries}) {
   
    const navigate = useNavigate();
    
    return(<> 
        <div className="center2">
            <h1 className={"buyorder-title"}>Your Buy Orders</h1>
        </div>
        <div className="new-button-container">
        <button className="new-button" onClick={()=>{navigate('/buyorder/new')}}>Place New Order</button>
        </div>
        {(buyOrders.length > 0 && selectedCountries.length > 0) ? <BuyOrderGrid buyOrders={buyOrders} selectedCountries={selectedCountries} />: null}
        {(selectedCountries.length > 0) ?  <CountriesSelector selectedCountries={selectedCountries} toggleSelectedCountries={toggleSelectedCountries}/> : null}
         
    </>);

}