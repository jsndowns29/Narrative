import React, { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BuyOrderDetailsForm from '../components/BuyOrderDetailsForm.js';
import {countAvailableDatasets} from '../helpers/helpers.js';
import axios from 'axios';

export default function EditBuyOrder({datasets, countries, handleEditBuyOrder}) {
    const {state} = useLocation();
    let navigate = useNavigate();
    const {buyOrder, newSelectedCountries, availableDatasets} = state;

    //selected countries within edit view, does not change selected countries in app.js ex: [{country: "United States", countryCode: 'US', selected: true}, ...]
    const[currentSelectedCountries, setCurrentSelectedCountries] = useState(newSelectedCountries);
     //dataset count given selected countries ex: [{"datasetId": 1,"recordCount":100, included: true}, ...]
    const[currentAvailableDatasets, setCurrentAvailableDatasets] = useState(availableDatasets);

    //useRef for name and budget, sent as props to BuyOrderDetailsForm, improvement over useState, avoid rerender
    const nameRef = useRef();
    const budgetRef = useRef();

    function toggleSelectedCountries(name){
    
        const newSelectedCountries = [...currentSelectedCountries];
        const country = newSelectedCountries.find(country => country.country === name);
        country.selected = !country.selected;
        setCurrentSelectedCountries(newSelectedCountries);
        
        //get arr of selected datasets for dataset grid rerender
        let selectedDatasetsArr = currentAvailableDatasets.filter((dataset)=>{return dataset.included === true}).map((dataset)=>{return dataset.datasetId});
        //countAvailableDatasets() located in src/helpers/helpers.js
        //and add selected property to available datasets
        setCurrentAvailableDatasets(countAvailableDatasets(newSelectedCountries, countries).map((dataset)=>{
            //problem here
            if(selectedDatasetsArr.includes(dataset.datasetId)) return {datasetId: dataset.datasetId,recordCount: dataset.recordCount, included: true};
            else return {datasetId: dataset.datasetId,recordCount: dataset.recordCount, included: false};
        }))
      }

    function toggleSelectedDatasets(id){
        const newAvailableDatasets = [...currentAvailableDatasets];
        const dataset = newAvailableDatasets.find(dataset => dataset.datasetId === id);
        dataset.included = !dataset.included;
        setCurrentAvailableDatasets(newAvailableDatasets);
    }
    
    async function handleSubmit(){
        
        //Name is chars only
        const checkName =/^[A-Za-z\s]*$/.test(nameRef.current.value);
        //budget is numbers and decimals only
        const checkBudget = /^[1-9]\d{0,2}(\.\d{3})*(,\d+)?$/.test(budgetRef.current.value)
        if(!checkName || !checkBudget){
            alert("Invalid input!\nOrder name must contain only letters and budget only numbers and decimals");
            return;
        }

        //create new buyorder object using updated data
        let id = buyOrder.id;
        let selectedDatasetsArr = currentAvailableDatasets.filter((dataset)=>{return dataset.included === true}).map((dataset)=>{return dataset.datasetId});
        let selectedCountriesArr = currentSelectedCountries.filter((country)=>{return country.selected === true}).map((country)=>{return country.countryCode});
        
        if(selectedDatasetsArr.length === 0 || selectedCountriesArr.length === 0){
            alert("Invalid input!\nAt least 1 country and 1 dataset must be selected");
            return;
        }

        let toUpdate = {"name": nameRef.current.value, "createdAt": buyOrder.createdAt,"datasetIds": selectedDatasetsArr,"countries": selectedCountriesArr,"budget": budgetRef.current.value}


        await axios.put("https://636accd1b10125b78fe51b68.mockapi.io/maritime/buy-orders/"+id, {
            "name": nameRef.current.value,
            "createdAt": buyOrder.createdAt,
            "datasetIds": selectedDatasetsArr,
            "countries": selectedCountriesArr,
            "budget": budgetRef.current.value
        })
          .then(function (response) {        
            handleEditBuyOrder(toUpdate);
            navigate('/buyorder');
            alert("Sucessfully edited order");
          })
          .catch(function (error) {
              console.error(error);
              alert("There was a problem editing the order")
        });
    }

    return (
        <div>
            <h1 style={{marginTop:"1em"}} className="center2">Edit Buy Order</h1>
           <BuyOrderDetailsForm  buyOrder={buyOrder} datasets={datasets} availableDatasets={currentAvailableDatasets} newSelectedCountries={currentSelectedCountries} toggleSelectedCountries={toggleSelectedCountries} toggleSelectedDatasets={toggleSelectedDatasets} nameRef={nameRef} budgetRef={budgetRef} fillInputFlag={true}/>
           <div className='submit-button-container'>
                <button onClick={handleSubmit} className='submit-button'>Save</button>
           </div> 
        </div>
    )
}
