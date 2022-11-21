import React, {useEffect} from 'react';
import BuyOrderDetailsDatasetsGrid from '../components/BuyOrderDetailsDatasetsGrid.js';
import BuyOrderDetailsCountriesSelector from './BuyOrderDetailsCountriesSelector.js';
import {parseDate} from '../helpers/helpers.js';

export default function BuyOrderDetailsForm({buyOrder, datasets, availableDatasets, newSelectedCountries, toggleSelectedCountries, toggleSelectedDatasets, nameRef, budgetRef, fillInputFlag}) {
    
    //initialize text inputs
    useEffect(()=>{
        if(fillInputFlag){
            document.getElementById("inputName").value = buyOrder.name;
            document.getElementById("inputBudget").value = buyOrder.budget;
        }
    },[buyOrder, fillInputFlag]);

    return (<div>
         <div className="center2">     
            {buyOrder? 
                <div className="buyorder-details-tile">
                    <div className="buyorder-details-content-wrapper">
                        <div className="same-line">
                            <div>
                                <p className="title gray-text">Order Name</p>
                                <br/>
                                <input ref={nameRef} type="text" id="inputName"></input>
                            </div>
                            <div style={{marginLeft:"8em"}}>
                                <p className="title gray-text">Date Created</p>
                                <br/>
                                <p>{parseDate(buyOrder)} </p>
                            </div>   
                        </div>
                        <div style={{marginTop:"2em"}}>
                            <p className="title gray-text">Order Budget</p>
                            <br/>
                            <input ref={budgetRef} type="text" id="inputBudget"></input>
                        </div>

                        <p style={{marginTop:"1em"}}className="title gray-text">Included Datasets</p>
                        {(datasets.length > 0) ? <BuyOrderDetailsDatasetsGrid datasets={datasets} availableDatasets={availableDatasets} toggleSelectedDatasets={toggleSelectedDatasets} />: null}
                       
                        <p style={{marginTop:"1em"}}className="title gray-text">Countries</p>
                        {(newSelectedCountries.length > 0) ?  <BuyOrderDetailsCountriesSelector selectedCountries={newSelectedCountries} toggleSelectedCountries={toggleSelectedCountries}/> : null}
                    </div>
                    
                </div> : null}
        </div>
    </div>
       
    )
}
