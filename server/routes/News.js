//Taleh Muzaffarov and Rajat Ghosh

const express = require('express'),
    News = express.Router(),
    model = require('../models/newsModel'),
    verifyToken = require('../exports/VerifyToken')

function renderURL(el) {
    return el.toLowerCase().
        replace(/ /g, "-").
        replace(/[Öö]/g, "oe").
        replace(/[Üü]/g, "ue").
        replace(/[ß]/g, "ss").
        replace(/[Ää]/g, "ae").
        replace(/[Éé]/g, "ee")

}
News.post('/fetch/:id', (req, res, next) => {
    /*  model.deleteMany({}, function (err, results) {
         console.log(results);
 
     })*/
    const category = '5e135cc94cde8b6fd850f554',
        img = 'https://pics.freiepresse.de/DYNIMG/95/53/7109553_M650x433.jpg',
        title = 'Anwalt Abela wird neuer Premier in Malta',
        url = renderURL(title),
        desc = 'Der Rechtsanwalt Robert Abela übernimmt in Malta die Macht von Premier Joseph Muscat. Seine Wahl zum Parteichef ist eine Überraschung, denn der 42-Jährige ist noch nicht lange im Parlament. Er steht für Erneuerung - zumindest in Maßen.',
        content = 'Die Entscheidung der Parteimitglieder war eine Überraschung. Abela sitzt erst seit 2017 im Parlament. Der im Ausland kaum bekannte Jurist steht bei Anhängern einerseits für einen Neuanfang. Gleichzeitig war sein Vater George Abela früher Staatspräsident. Abela selbst hatte die Regierung juristisch beraten.',
        publish_date = new Date,
        update_date = new Date

    /* model.create({
        category: category,
        img: img,
        title: title,
        url: url,
        desc: desc,
        content: content,
        publish_date: publish_date,
        update_date: update_date
    }); */
    if (req.params.id === "undefined") {
        query = {}
    }
    else {
        query = { category: req.params.id }
    }

    model.find(query, function (err, results) {
        res.send(results)
    });

    /* model.find({}).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
}); */

    //res.send({ test: "Hallo Leute !!" })
});

News.post('/category', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            const id = req.body.data
            model.find(query, function (err, results) {
                res.send(results)
            });
        }
    })
})

module.exports = News //export 
