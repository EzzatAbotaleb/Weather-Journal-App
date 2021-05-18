/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=668ba3755920704c77594d9a8291fe2c&units=imperial';
let zip = document.getElementById('zip');
let feelings =  document.getElementById('feelings');
 

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
 
// GET route with async promises

let getWeather = async (baseUrl, userZip , apikey)=>{
  
      const response = await fetch(baseUrl+userZip+apikey);
      
      try{
        let data =await response.json();
      console.log(data);
      return data;
      }
      catch(error){
      console.log('error',error);
      }
  
}

//add data to post requesst 
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },       
    body: JSON.stringify(data), 
  });

    try {
      let newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', apiData);
// event function
function apiData(a){    
  let userZip = zip.value;
getWeather(baseUrl,userZip,apiKey)
.then(function(data){
  console.log(data);
  // add data to post request
postData('/addData',{temp:data.main.temp,date:newDate,feels:feelings.value})
.then(updateUI());
});

}
let updateUI = async()=>{
  let request = await fetch('/all');
  try{
    let allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerText = 'Today is : ' + allData.date;
    document.getElementById('temp').innerText ='The temprature is : ' + allData.temp;
    document.getElementById('content').innerText ='User feelings : ' + allData.feels ;
  }
  catch(error){
    console.log('error', error);
  }
}