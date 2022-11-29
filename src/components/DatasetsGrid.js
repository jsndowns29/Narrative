import React from "react";
import DatasetTile from './DatasetTile.js';
import '../styles.css'; 

export default function DatasetsGrid({datasets, availableDatasets, selectedCountries}) {
       
       //count datasets
       let numAvailableDatasets = availableDatasets.filter(dataset=>dataset.recordCount > 0).length;
       //
       const countries = selectedCountries.filter((country)=>{return country.selected === true}).map((country)=>{return country.country});
       const countriesList = countries.join(", ").replace(/,(?=[^,]+$)/, ' &');
        //if API returns more datasets in countries.storedData than in datasets
       if(datasets.length < availableDatasets.length){
            numAvailableDatasets = numAvailableDatasets - (availableDatasets.length - datasets.length);
       }
 
   let grid = <div className="datasets-grid-container center">
        
        {datasets.map((dataset)=>{
            return  <DatasetTile key={window.location.href + "datasetTile"+dataset.id} dataset={dataset} available={availableDatasets} />  
        })}   
    </div>;
   
    return <>
        <div className="center2">
            <p className={"datasets-text"}>Showing <strong>{numAvailableDatasets}</strong> results from <strong>{countriesList}</strong></p>
        </div>
        {availableDatasets.length !== 0 && availableDatasets[0] ? grid : null}
    </>
    
}

