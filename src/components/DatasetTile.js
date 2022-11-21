import React from "react"
import '../styles.css' 

export default function DatasetTile({dataset, available}) {

  const tile = <div className="dataset-tile">
                <div className="content-wrapper">
                    
                    <div className="same-line">
                      <img className="" src={dataset.thumbnailUrl} alt="" width="80" height="80" />
                      <h1 className="headline">{dataset.label}</h1>
                    </div>
                  
                    <p className="title space">Dataset description</p>
                    <p className="space"> {dataset.description} </p>

                    <div className="same-line space"> 
                      <p className="title">Cost Per Record:</p>
                      <p className="align-right">{'$'+dataset.costPerRecord}</p>
                    </div>

                    <div className="same-line space"> 
                      <p className="title">Available Records:</p>
                      <p className="align-right">{available[dataset.id-1].recordCount}</p>
                    </div>    
                </div>  
              </div>;
    return <>{available[dataset.id-1].recordCount > 0 ? tile : null}</>
}