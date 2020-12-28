//Taleh Muzaffarov and Rajat Ghosh

const express = require('express'),
    Channels = express.Router(),
    model = require('../models/channelModel');

Channels.post('/:id', (req, res, next) => {
    model.aggregate([
        {
            $lookup: {
                from: 'podcasts',
                localField: '_id',
                foreignField: 'channel',
                as: 'podcast'
            },

        },
        {
            $project: {
                category: 1, img: 1, name: 1, desc: 1, podcast_count: { $size: "$podcast" }, length: { $sum: "$podcast.length" }
            }
        }


    ], function (err, results) {

        res.send(results)
    })
    if (req.params.id === "undefined") {
        query = {}
    }
    else {
        query = { category: req.params.id }
    }

    /* model.find(query, function (err, results) {
        res.send(results)
    }); */

    /* model.find({}); */
});

module.exports = Channels //export
