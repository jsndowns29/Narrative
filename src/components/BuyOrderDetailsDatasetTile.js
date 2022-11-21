import React, {useState, useEffect} from "react"
import '../styles.css' 

export default function BuyOrderDetailsDatasetTile({dataset, available, toggleSelectedDatasets}) {
  
  
  const [color, setColor] = useState({backgroundColor: "#EAEAEA"});
    //set color based on whether or not button is selected
    useEffect(() => {
        let selected = available[dataset.id-1].included;
        if(selected) setColor({backgroundColor: "silver"});
        else setColor({backgroundColor: "#EAEAEA"});  
    }, [available]);
   
  const tile = <div onClick={()=>{toggleSelectedDatasets(dataset.id)}} style={color} className="buyorder-details-dataset-tile">
                <div className="buyorder-details-dataset-tile-content-wrapper">
                    
                    <div className="same-line">
                      <img className="" src={dataset.thumbnailUrl} alt="" width="40" height="40" />
                      <h4 className="buyorder-details-dataset-tile-text">{dataset.label}</h4>
                    </div>
                  
                    
                    <p className="buyorder-details-dataset-tile-subtext">{"$" + dataset.costPerRecord + " per record"}</p>

                    <p className="buyorder-details-dataset-tile-subtext">{available[dataset.id-1].recordCount + " available"}</p> 
                </div>  
              </div>;

    return <>{tile}</>
}