const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.set('view engine');

app.use(express.static(__dirname, + '/public'));

app.get('/', function(req, res) {
    
})