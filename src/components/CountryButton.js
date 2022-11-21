import React, {useState, useEffect} from 'react'
import '../styles.css' 

export default function CountryButton({country, selected, toggleSelectedCountries}) {
    const [color, setColor] = useState({backgroundColor: "white"});
    //set color based on whether or not button is selected
    useEffect(() => {
        if(selected) setColor({backgroundColor: "silver"});
        else setColor({backgroundColor: "white"});  
    }, [selected]);
    

    return <button className="country-button" style={color} onClick={()=>{toggleSelectedCountries(country)}}>{country}</button>

}
