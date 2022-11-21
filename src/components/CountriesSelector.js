import React from "react";
import CountryButton from './CountryButton.js';
import '../styles.css'; 

export default function CountriesSelector({selectedCountries, toggleSelectedCountries}) {
    //console.log(selectedCountries);
   
    return <div className="countries-panel center">
        <div className="buttons-container">
            {selectedCountries.map((country)=>{
                return <CountryButton key={window.location.href + "country"+country.country} country={country.country} selected={country.selected} toggleSelectedCountries={toggleSelectedCountries}/>
            })}
        </div>
    </div>
    
}