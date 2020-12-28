//Taleh Muzaffarov

const express = require('express'),
    Podcast = express.Router(),
    model = require('../models/podcastModel');

function renderURL(el) {
    return el.toLowerCase().
        replace(/ /g, "-").
        replace(/[Öö]/g, "oe").
        replace(/[Üü]/g, "ue").
        replace(/[ß]/g, "ss").
        replace(/[Ää]/g, "ae").
        replace(/[Éé]/g, "ee")
}
Podcast.post('/top', (req, res, next) => {
    /*  model.deleteMany({}, function (err, results) {
         console.log(results);
     })*/
    /* const category = '5e135cc94cde8b6fd850f556',
        img = 'https://www.fiveberg.de/assets/images/logo_skyblue.png',
        name = 'Fiveberg Innovations',
        desc = 'Latest Trends on news industry',
        publish_date = new Date,
        update_date = new Date

    model.create({
        category: category,
        img: img,
        name: name,
        desc: desc,
        publish_date: publish_date,
        update_date: update_date
    }); */
    const channel = '5e3c37225469e720dc8d5361',
        episode = '1',
        length = 3.45,
        title = '2020 Chempionship: Barcelona - Real Madrid ',
        source = 'http://www.nihilus.net/soundtracks/Static%20Memories.mp3',
        desc = 'Very active game held on 06.02.2020',
        publish_date = new Date,
        update_date = new Date

    /* model.create({
        channel: channel,
        episode: episode,
        length: length,
        title: title,
        source: source,
        desc: desc,
        publish_date: publish_date,
        update_date: update_date
    }); */
    model.aggregate([
        {
            $lookup: {
                from: 'podcasts',
                localField: '_id',
                foreignField: 'channel',
                as: 'podcasts'
            }

        },
        { $unwind: "$podcasts" },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            },
        },
        { $unwind: "$category" },
        { $project: { "category.desc": 0, "category._id": 0, "category.__v": 0 } },


    ], function (err, results) {
        res.send(results)
        console.log(results);

    })
    /* model.find({}); */
});

module.exports = Podcast //export
