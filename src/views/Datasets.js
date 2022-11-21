import React from "react"
import DatasetsGrid from '../components/DatasetsGrid.js';
import CountriesSelector from '../components/CountriesSelector.js';
import '../styles.css' 

export default function Datasets({datasets, selectedCountries, toggleSelectedCountries, availableDatasets}) {
    
    return (<>
       <div className="center2">
            <h1 className={"buyorder-title"}>Datasets</h1>
        </div>
       {(datasets.length > 0) ? <DatasetsGrid datasets={datasets} availableDatasets={availableDatasets} selectedCountries={selectedCountries} />: null}
       {(selectedCountries.length > 0) ?  <CountriesSelector selectedCountries={selectedCountries} toggleSelectedCountries={toggleSelectedCountries}/> : null}
       
    </>);
    
}