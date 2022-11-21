import React from 'react';
import BuyOrderDetailsDatasetTile from './BuyOrderDetailsDatasetTile.js';

export default function BuyOrderDetailsDatasetsGrid({datasets, availableDatasets, toggleSelectedDatasets}) {

    let grid = <div className="buyorder-details-dataset-container center">
    {datasets.map((dataset)=>{
        
        return  <BuyOrderDetailsDatasetTile key={window.location.href + "BuyOrderDetails"+dataset.id} dataset={dataset} available={availableDatasets} toggleSelectedDatasets={toggleSelectedDatasets} />  
    })}   
</div>;

return <>
    {datasets && availableDatasets && availableDatasets[0] ? grid : null}
</>
}
