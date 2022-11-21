import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import {countAvailableDatasets} from './helpers/helpers.js';
import axios from 'axios';
import Navbar from './components/Navbar.js';
import Datasets from './views/Datasets.js';
import BuyOrder from './views/BuyOrder';
import BuyOrderDetails from './views/BuyOrderDetails.js';
import EditBuyOrder from './views/EditBuyOrder.js';
import NewBuyOrder from './views/NewBuyOrder.js';
import NotFound from './views/404.js';



function App() {
  //original API data
  const [datasets, setDatasets] = useState([]);
  const [countries, setCountries] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  //Array of objects representing state of countries selector ex: [{country: "United States", countryCode: 'US', selected: true}, ...]
  const [selectedCountries, setSelectedCountries] = useState([]);
  //Stores the record count for each dataset in accordance with selected countries [{"datasetId": 1,"recordCount":100}, ...]
  const [availableDatasets, setAvailableDatasets] = useState([]);
  

  //load datasets on page load
  useEffect(()=>{
      fetchData();
  }, []);

  const apiUrl = "https://636accd1b10125b78fe51b68.mockapi.io/maritime/";

  const getAPICallOptions = (endpoint) =>{
    const options = {method: 'GET', url: apiUrl+endpoint, headers: {accept: 'application/json'}};
    return options;
  }

  const fetchData = async () => {
    await axios.request(getAPICallOptions("datasets"))
          .then(function (response) {        
            setDatasets(response.data);
          })
          .catch(function (error) {
              console.error(error);
          });
    await axios
        .request(getAPICallOptions("countries"))
        .then(function (response) {
            setCountries(response.data);
            //initialize selected country panel
            initSelectedCountries(response.data);
        })
        .catch(function (error) {
            console.error(error);
    });
    await axios.request(getAPICallOptions("buy-orders"))
          .then(function (response) {        
            setBuyOrders(response.data);
          })
          .catch(function (error) {
              console.error(error);
          });
  }
  
  //initializes the status of the countries scelecter via selectedCountries state, defaults to all countries selected 
  function initSelectedCountries(countries){
    //add countries to selection panel 
    if(selectedCountries.length > 0) return;
    const arr = countries.map((country) => {return {country:country.name, countryCode: country.countryCode, selected: true}});
    setSelectedCountries(arr);
    //get datasets that are present in currently selected countries
    //countAvailableDatasets() located in src/helpers/helpers.js
    setAvailableDatasets(countAvailableDatasets(arr, countries));
  }
  //Toggles the selected status of countries in the countries scelecter and updates selectedCountries state
  function toggleSelectedCountries(name){
    
    const newSelectedCountries = [...selectedCountries];
    const country = newSelectedCountries.find(country => country.country === name);
    country.selected = !country.selected;
    setSelectedCountries(newSelectedCountries);
    //countAvailableDatasets() located in src/helpers/helpers.js
    setAvailableDatasets(countAvailableDatasets(newSelectedCountries, countries));
  }

  //deletes buy order given order id
  function handleDeleteBuyOrder(id){
    const newBuyOrders = buyOrders.filter(buyOrder => {return buyOrder.id !== id});
    setBuyOrders(newBuyOrders);
  }

  //Replace buyorder with edited buyorder created in edit page
  function handleEditBuyOrder(editedBuyOrder){
    const newBuyOrders = [...buyOrders];
    let buyOrder = newBuyOrders.find(buyOrder => buyOrder.id === editedBuyOrder.id);
    buyOrder = {...editedBuyOrder};
    setBuyOrders(newBuyOrders);
  }

  function handleAddBuyOrder(BuyOrderToAdd){
    //const options = {method: 'POST', url: apiUrl+endpoint, headers: {accept: 'application/json'}};
    setBuyOrders((prev)=>{return [...prev, BuyOrderToAdd]});
  }

  return (
    <>
      <Navbar />
      
        <Routes>
          
          <Route path="/" element={<Datasets datasets={datasets} selectedCountries={selectedCountries} toggleSelectedCountries={toggleSelectedCountries} availableDatasets={availableDatasets}/>} />
          <Route path="/buyorder">
            <Route index element={<BuyOrder buyOrders={buyOrders} selectedCountries={selectedCountries} toggleSelectedCountries={toggleSelectedCountries}/>}/>
            <Route path="/buyorder/details/:id" element={<BuyOrderDetails buyOrders={buyOrders} datasets={datasets} selectedCountries={selectedCountries} countries={countries} handleDeleteBuyOrder={handleDeleteBuyOrder}/>}/>
            <Route path="/buyorder/details/:id/edit" element={<EditBuyOrder datasets={datasets} countries={countries} handleEditBuyOrder={handleEditBuyOrder}/>}/>
            <Route path="/buyorder/new" element={<NewBuyOrder datasets={datasets} countries={countries} handleAddBuyOrder={handleAddBuyOrder}/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
