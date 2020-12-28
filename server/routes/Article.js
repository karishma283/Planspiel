//Taleh Muzaffarov and Shruti Chauhan

const express = require('express'),
    Article = express.Router(),
    model = require('../models/newsModel');

Article.post('/:url', (req, res, next) => {


    const query = { url: req.params.url }


    model.findOne(query, function (err, results) {

        res.send(results)
    });

    /* model.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
}); */

});

module.exports = Article //export 
