// Setup empty JS object to act as endpoint for all routes
    let projectData = {};

// Require Express to run server and routes
    var express = require('express');

// Start up an instance of app
    var app = express();

/* Middleware*/
    const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

// Cors for cross origin allowance
    const cors = require('cors');
    const { url } = require('inspector');
    const { request } = require('http');
    app.use(cors());
// Initialize the main project folder
    app.use(express.static('website'));

//port :
    const port = 8080;

// Setup Server
    const server = app.listen(port,()=>{
    console.log('server running');
    console.log(`runing on localhost: ${port}`);
});

//GET route
    app.get('/all', getData);

    function getData(req,res){
        console.log(req);
        res.send(projectData);
}
//POST route 
    
    app.post('/addData', addWeather);
    function addWeather(req , res){
        let newData = req.body;
        projectData['temp'] = newData.temp;
        projectData['date'] = newData.date;
        projectData['feels'] = newData.feels;
        
        res.send(projectData);
        console.log(projectData);
    }
     