var querystring = require('querystring'),
    http = require('http'),
    commandsFlow = require('./commandsFlow'),
    natural = require('natural'),
    classifier = new natural.BayesClassifier();



classifier.addDocument('Eve recherche sur wikipedia', 'wikipedia');
classifier.addDocument('Eve recherche wikipedia', 'wikipedia');
classifier.addDocument('Eve wikipedia', 'wikipedia');
classifier.addDocument('Eve bonjour','conversation');

classifier.addDocument('Eve dis bonjour à', 'conversation');
classifier.addDocument('Eve dis bonjour a', 'conversation');
classifier.addDocument('Eve dis bonjour', 'conversation');


classifier.train();




exports.interpretCommand = function(req, res) {

    console.log("API POST intrepretCommand");
    commandsFlow.pushCommand("POST intrepretCommand '" + req.body.command.message + "'");

    console.log(classifier.classify(req.body.command.message));
    console.log(classifier.getClassifications(req.body.command.message));

    res.json({
        status: 200,
        command: classifier.classify(req.body.command.message)
    });


};
