var express = require("express");
var path = require("path");

var app = express();
var unix_pattern = new RegExp('[0-9]{10}');

app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

app.get('/:time', function(req, res) {
    console.log(req.params);
    
    var date;
    var body;
    var time = req.params.time;
    
    if (unix_pattern.test(time)) {
        date = new Date(time * 1000);
        body = {unix: time, natural: format_date(date)}
    } else {
        date = Date.parse(time);
        if (isNaN(date)) {
            body = {unix: null, natural: null};
        } else {
            body = {unix: date/1000, natural: time};
        }
    }
    res.send(body);
});

function format_date(date) {
    var parts = date.toDateString().split(" ");

    var month;
    
    switch (parts[1]) {
        case "Jan":
            month = "January";
            break;
        case "Feb":
            month = "February";
            break;
        case "Mar":
            month = "March";
            break;
        case "Apr":
            month = "April";
            break;
        case "May":
            month = "May";
            break;
        case "Jun":
            month = "June";
            break;
        case "Jul":
            month = "July";
            break;
        case "Aug":
            month = "August";
            break;
        case "Sep":
            month = "September";
            break;
        case "Oct":
            month = "October";
            break;
        case "Nov":
            month = "November";
            break;
        case "Dec":
            month = "December";
            break;
    }
    return month + " " + parts[2] + ", " + parts[3];
};

app.listen(8080, function() {
    console.log("app listening on post 8080");
});
