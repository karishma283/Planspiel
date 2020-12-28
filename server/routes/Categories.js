//Taleh Muzaffarov and Rajat Ghosh

const express = require('express'),
    Categories = express.Router(),
    model = require('../models/categoriesModel'),
    userModel = require('../models/user'),
    jwt = require('jsonwebtoken'),
    verifyToken = require('../exports/VerifyToken')
Categories.post('/user', verifyToken, (req, res, next) => {

    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            /* model.create({
                name: 'Weather',
                desc: 'Weather News',
            },
                {
                    name: 'Traffic',
                    desc: 'Traffic News',

                },
                {
                    name: 'Health',
                    desc: 'Health News',

                }, {
                name: 'Environment',
                desc: 'Environment News',

            }, {
                name: 'Europe',
                desc: 'Europe News',

            },
                {
                    name: 'Magazine',
                    desc: 'Magazine News',

                }); */
            userModel.findOne({ email: data.email }, function (err, results) {
                //res.send(results.category)
                model.find({
                    '_id': { $in: results.category }
                }, function (err, category) {
                    res.send({ data: category })
                });
            });

        }
    });
});

Categories.get('/all', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            model.find({}, function (err, results) {
                res.send(results)
            });
        }
    });
});

Categories.post('/add', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            const category = req.body

            userModel.update({ "email": data.email }, { $set: { "category": category } }, function (err, results) {
                //res.send(results)
                console.log(results);
                if (!err) {
                    model.find({
                        '_id': { $in: category }
                    }, function (err, docs) {
                        res.send(docs)
                        console.log(docs);
                    });
                }
                else {
                    console.log(err);

                }

            });
        }
    });
});
module.exports = Categories 
