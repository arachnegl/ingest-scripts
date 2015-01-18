var fs = require('fs');
var mongoose = require('mongoose');
var _ = require('underscore');

mongoose.connect('mongodb://localhost/test');

var fileName = 'countryInfo.txt';

var Country = mongoose.model('CountryInfo', {
    ISO: String,
    ISO3: String,  
    ISO_Numeric: String, 
    fips: String, 
    country: String, 
    capital: String, 
    area: String,
    Population: String, 
    Continent: String, 
    tld: String, 
    CurrencyCode: String, 
    CurrencyName: String,
    Phone: String, 
    postal_code_format: String, 
    postal_code_regex: String, 
    Languages: String,
    geonameid: String, 
    neighbours: String, 
    EquivalentFipsCode: String
});


fs.readFile (fileName, {encoding: 'utf8'}, function (err, data) {

    if (err) console.log(err);

    var lines = data.split(/[\n\r]/);
    var rows = [];
    var delimiter = '\t';

    lines.forEach(function (line) {
        // strip comments and empty lines
        if (line[0] !== '#' && line !== '') {
            var elements = line.split(delimiter);
            rows.push(elements);
        }
    });

    rows.forEach(function (row) {

        var country = new Country({
            ISO: row[0],
            ISO3: row[1],  
            ISO_Numeric: row[2],
            fips: row[3], 
            country: row[4],
            capital: row[5], 
            area: row[6],
            Population: row[7],
            Continent: row[8], 
            tld: row[9], 
            CurrencyCode: row[10],
            CurrencyName: row[11],
            Phone: row[12], 
            postal_code_format: row[13],
            postal_code_regex: row[14], 
            Languages: row[15],
            geonameid: row[16], 
            neighbours: row[17], 
            EquivalentFipsCode: row[18]
        });

        country.save(function (err) {
            if (err) console.log(err);
        });

    });

    console.log('done');

});
