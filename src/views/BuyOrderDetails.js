import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import {parseDate, countAvailableDatasets} from '../helpers/helpers.js';
import BuyOrderDetailsDatasetsGrid from '../components/BuyOrderDetailsDatasetsGrid.js';
import BuyOrderDetailsCountriesSelector from '../components/BuyOrderDetailsCountriesSelector.js';
import axios from 'axios';

export default function BuyOrderDetails({buyOrders, datasets, selectedCountries, countries, handleDeleteBuyOrder}) {

    const { id } = useParams();
    const navigate = useNavigate();
    //buyorder to be displayed
    const [buyOrder, setBuyOrder] = useState({});
    //selected countries within details view, does not change selected countries in app.js ex: [{country: "United States", countryCode: 'US', selected: true}, ...]
    const [newSelectedCountries, setNewSelectedCountries] = useState([]);
    //dataset count given selected countries ex: [{"datasetId": 1,"recordCount":100, included: true}, ...]
    const [availableDatasets, setAvailableDatasets] = useState([]);
    
    useEffect(()=>{
        //get buy order with matching id
        if(buyOrders) setBuyOrder(buyOrders.filter((order)=>order.id === id)[0]);
        //use selected countries object containing all countries and reinitialze selected with selected countries in buy order
        //this way we don't need to parse countries object again
        let newSelectedCountries = [];
        if(datasets && buyOrder && selectedCountries && countries){
            newSelectedCountries = selectedCountries.map((country)=>{
                if(buyOrder.countries.includes(country.countryCode)){
                    return {country:country.country, countryCode: country.countryCode, selected: true};
                } 
                else return {country:country.country, countryCode: country.countryCode, selected: false};
            });
            setNewSelectedCountries(newSelectedCountries);

            //add selected property to available datasets
            const newAvailableDatasets = countAvailableDatasets(newSelectedCountries, countries).map((dataset)=>{
                if(buyOrder.datasetIds.includes(dataset.datasetId)) return {datasetId: dataset.datasetId,recordCount: dataset.recordCount, included: true};
                else return {datasetId: dataset.datasetId,recordCount: dataset.recordCount, included: false};
            })
            setAvailableDatasets(newAvailableDatasets);
        } 
        
        //console.log(newSelectedCountries);
    }, [buyOrders, id, selectedCountries, buyOrder, countries, datasets]);

    //do nothing on view order details page
    function toggleSelectedCountries(name){}
    function toggleSelectedDatasets(id){}

    //on click of edit button go to edit page and pass along relevant data
    function edit(){
        navigate("/buyorder/details/"+id+"/edit",{
            state:{
                buyOrder: buyOrder,
                newSelectedCountries: newSelectedCountries,
                availableDatasets: availableDatasets,
            }
        });
    }

    async function deleteOrder(){

        await axios.delete("https://636accd1b10125b78fe51b68.mockapi.io/maritime/buy-orders/"+id)
          .then(function (response) {        
            handleDeleteBuyOrder(id);
            navigate('/buyorder');
            alert("Sucessfully deleted order");
          })
          .catch(function (error) {
              console.error(error);
              alert("There was a problem deleting the order")
        });
        
    }
    
    return (<div>
        <h1 style={{marginTop:"1em"}} className="center2">Buy Order Details</h1> 
         <div className="center2">     
            {buyOrders.length > 0 && buyOrder? 
                <div className="buyorder-details-tile">
                    <div className="buyorder-details-content-wrapper">
                        <div className="same-line">
                            <div>
                                <p className="title gray-text">Order Name</p>
                                <br/>
                                <p>{buyOrder.name} </p>
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
                            <p>{'$' + buyOrder.budget} </p>
                        </div>

                        <p style={{marginTop:"1em"}}className="title gray-text">Included Datasets</p>
                        {(datasets.length > 0) ? <BuyOrderDetailsDatasetsGrid datasets={datasets} availableDatasets={availableDatasets} toggleSelectedDatasets={toggleSelectedDatasets} />: null}
                       
                        <p style={{marginTop:"1em"}}className="title gray-text">Countries</p>
                        {(newSelectedCountries.length > 0) ?  <BuyOrderDetailsCountriesSelector selectedCountries={newSelectedCountries} toggleSelectedCountries={toggleSelectedCountries}/> : null}
                    </div>

                    <div className="view-page-buttons-container float-right same-line">
                        <button onClick={edit} className="view-page-buttons">Edit Order</button>
                        <button onClick={deleteOrder} className="view-page-buttons">Delete Order</button>
                    </div>
                    
                </div> : null}
        </div>
    </div>
       
    )
}
