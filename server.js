const express = require('express');
const axios = require('axios');

const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", function (req, res) {

    res.render('index', {weather: null, error: null});

});

app.get('/weather', async function (req, res) {

    const city = req.query.city;
    const apiKey = '91c830d7b8036479a7cc88408b35cd1e';

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=imperial&appid=" + apiKey;

    console.log(url);

    let weather, error = null;

    try {

        const response = await axios.get(url);

        console.log('response :- ' + response);

        weather = response.data;

        console.log('weather :- ' + weather);
        
    } catch (e) {

        weather = null;
        error = 'Please try again';

        console.log(e);

    }
    
    res.render('index', {weather, error});

});

const port = process.env.PORT || 3000;
app.listen(port, () => {

    console.log(`Server started on port ${port}`);

});

