const express = require('express');
const path = require('path');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

const app = express();
const fs = require('fs');

const Twit = require('twit');
const config = require('./config.js');

const Twitter = new Twit(config);


var params = {
    q: 'canada',
    result_type: 'recent',
    count: '50',
    lang: 'en'
}

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get('/*', function (req, res) {
    
    Twitter.get('search/tweets', params, function(err, data) {
        
        var newData = JSON.stringify(data.statuses);
        
        fs.writeFile('./frontend/static/js/views/posts.json', newData, err => {
           if(err) throw err;
        })   
    })
    res.sendFile(path.resolve(__dirname,"frontend", "index.html"));

})
    


var server = app.listen(PORT, function () {
    
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

 });
