// Debug:
// node-inspector&
// node-deubg city-data-scrape.js

var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var url = 'http://www.geonames.org/countries/';

var Country = mongoose.model('Country', {
    code: String,
    country: String,
    capital: String,
    area: String,
    pop: String,
    continent: String
});

mongoose.connection.collections['countries'].drop(function (err) {
    if (err) {
        console.log(err);
    }
    console.log('collection dropped');
});

request(url, function (err, res, html) {
    
    var $, trs, rows;

    if (err) {
        console.log(err);
    }

    $ = cheerio.load(html);

    trs = $('table#countries').find('tr');

    rows = [];
    trs.each(function (i, el) {

        var row, tds;

        row = [];
        tds = $(this).find('td');

        tds.each(function(i, el){

            var td;

            td = $(this).text();
            row.push(td);

        });

        rows.push(row);
    });

    var items_to_ingest = _.map(rows, function (row) {

        var obj = {
            code: row[0],
            country: row[4],
            capital: row[5],
            area: row[6],
            pop: row[7],
            continent: row[8], 
        };

        return obj;
    });

    items_to_ingest.forEach(function (item) {

        var country = new Country(item);
        country.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

    });

    console.log('done');
});
