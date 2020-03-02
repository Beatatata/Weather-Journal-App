// Setup empty JS object to act as endpoint for all routes
projectData={};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'website')));

// Setup Server
const port = 8888;
app.listen(port, () => console.log(`Server running! Running on localhost: ${port}!`))

// Callback function to complete GET '/all'
app.get('/all', function(req, res) {
    res.send(projectData);
})

app.post('/add', (request,response)=>{
    // console.log(request.body)
    let data = request.body;
    // Create new entry for JS Object Endpoint
    projectData["temp"] = data.temp;
    projectData["date"] = data.date;
    projectData["feel"] = data.feeling;
    // Send response to Endpoint
    response.send(projectData);
    console.log(projectData);
})