//takes in buyorder, returns formated date from buyorder
export function parseDate(buyOrder){
    const year = buyOrder.createdAt.slice(0,4);
    const month = buyOrder.createdAt.slice(5,7);
    const day = buyOrder.createdAt.slice(8,10);
    const date = year+"/"+month+"/"+day;
    return date;
}

  //This function adds # of records in selected countries, it is called by toggleSelectedCountries and initSelectedCountries
  //Must be called when selected countries state is initialized or changes
export function countAvailableDatasets(selectedCountries, countries){
    //get names of seleted countries: filter where selected is true, then get arr of names
    const parseSelectedCountries = selectedCountries.filter(country=>{return country.selected===true});
    const selectedCountryNames = parseSelectedCountries.map(country=>country.country);
    //filter out countries that are not selected from countries data returned by api
    const newCountries = countries.filter(country=>{return selectedCountryNames.includes(country.name)});
    //return an empty array if no countries selected
    if(newCountries.length === 0) {
      return [];
    };
    
    let sum = addDatasetTotal(newCountries);
    return sum;
}

//Helper funtion to add dataset counts, called by countAvailableDatasets
function addDatasetTotal(newCountries){
    //create new count array of size n where n is the total number of datasets
    let sum = [ ...Array(newCountries[0].storedData.length).keys() ].map( i => {return {"datasetId":i+1,"recordCount":0}});
    for(let i=0;i<newCountries.length;i++){
      for(let j=0;j<newCountries[i].storedData.length;j++){
        sum[j].recordCount = sum[j].recordCount + newCountries[i].storedData[j].recordCount; 
      }
    }
    return sum;
  }

export function getDate(){
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  let hour = today.getHours(); // => 9
  let min = today.getMinutes(); // =>  30
  let sec = today.getSeconds(); // => 51

  if (hour < 10) hour = '0' + hour;
  if (min < 10) min = '0' + min;
  if (sec < 10) sec = '0' + sec;

  let formattedDate = yyyy+'-'+mm+'-'+dd+'T'+hour+':'+min+':'+sec+"+0000";

  return formattedDate;
}