var querystring = require('querystring'),
    http = require('http');

exports.getWikipediaArticle = function(req, res) {

    console.log("API get wikipedia article");

    var queryParam = querystring.stringify({
        format: 'json',
        action: 'query',
        titles: req.params.title,
        prop: 'extracts',
        exintro: 'true',
        explaintext: 'true',
        redirects: 'true'
    });

    var options = {
        host: 'fr.wikipedia.org',
        port: 80,
        path: '/w/api.php?' + queryParam,
        method: 'GET',
    };

    try {

        var httpreq = http.request(options, function(response) {
            response.setEncoding('utf8');
            response.on('data', function(body) {
                try {
                    console.log(body);
                    var jsonData = JSON.parse(body);
                    if (!jsonData.query.pages) {
                        throw "Page not found";
                    }
                    var keys = Object.keys(jsonData.query.pages);
                    console.log("keys:" + keys);
                    if (keys.length > 0) {
                        console.log("key.length");
                        if ((keys[0]== "-1") || (!jsonData.query.pages[keys[0]].extract)) {
                            throw new Error("Page not found");
                        }
                    }
                    var latestArticle = jsonData.query.pages[keys[0]].extract;

                    console.log("API latestArticle: " +latestArticle);
                    res.json({
                        status: 200,
                        message: latestArticle
                    });
                }
                catch (err) {
                    console.log("Err : " + err.message);
                    res.json({
                        status: 500,
                        message: 'Error while gettting wikipedia article: ' + err.message
                    });
                }
            });
        });
        httpreq.end();
        console.log("API get sent");
    }
    catch (err) {
        console.log("Err : " + err.message);
        res.json({
            status: 500,
            message: 'Error while gettting wikipedia article: ' + err.message
        });
    }

};
