import React from "react";
import DatasetTile from './DatasetTile.js';
import '../styles.css'; 

export default function DatasetsGrid({datasets, availableDatasets, selectedCountries}) {
       
   let grid = <div className="datasets-grid-container center">
        {datasets.map((dataset)=>{
            return  <DatasetTile key={window.location.href + "datasetTile"+dataset.id} dataset={dataset} available={availableDatasets} />  
        })}   
    </div>;
   
    return <>
        {availableDatasets.length !== 0 && availableDatasets[0] ? grid : null}
    </>
    
}

