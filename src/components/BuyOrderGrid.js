import React from 'react';
import BuyOrderTile from './BuyOrderTile.js';

export default function BuyOrderGrid({buyOrders, selectedCountries}) {

    //get names of seleted country codes: filter where selected is true, then get arr of country codes
    const parseSelectedCountries = selectedCountries.filter(country=>{return country.selected===true});
    const selectedCountryCodes = parseSelectedCountries.map(country=>country.countryCode);
    //filter out orders that don't include selected countries
    const orders = buyOrders.filter(order=>{return order.countries.some(order => {return selectedCountryCodes.includes(order)})});
    const countries = selectedCountries.filter((country)=>{return country.selected === true}).map((country)=>{return country.country});
    const countriesList = countries.join(", ").replace(/,(?=[^,]+$)/, ' &');
    //console.log(orders);
    
    let grid = <div className="buyorder-grid-container">
        {orders.map((buyOrder)=>{
            return  <BuyOrderTile key={window.location.href + "buyOrder"+buyOrder.id} buyOrder={buyOrder} /> ; 
        })}   
    </div>;

    return (<>
        <div className="center2">
            <p className={"buyorder-text"}>Showing <strong>{orders.length}</strong> results from <strong>{countriesList}</strong></p>
        </div>
        {grid}
    </>)
}
