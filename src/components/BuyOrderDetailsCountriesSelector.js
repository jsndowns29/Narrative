import React from "react"
import CountryButton from './CountryButton.js'
import '../styles.css' 

export default function BuyOrderDetailsCountriesSelector({selectedCountries, toggleSelectedCountries}) {
    //console.log(selectedCountries);
   
    return <div style={{marginTop:"2.5em"}} className="center">
        <div>
            {selectedCountries ?selectedCountries.map((country)=>{
                return <CountryButton key={window.location.href + "countrySelectorDetails" + country.country} country={country.country} selected={country.selected} toggleSelectedCountries={toggleSelectedCountries}/>
            }): null}
        </div>
    </div>
    
}