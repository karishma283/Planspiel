//Taleh Muzaffarov

const express = require('express'),
    User = express.Router(),
    model = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs'),
    verifyToken = require('../exports/VerifyToken')
var GmfScores = require('../models/userScores')
const ObjectId = require("mongoose").Types.ObjectId;

User.post('/register', (req, res, next) => {
    const user = req.body
    try {
        model.create(user, function (err, result) {
            console.log(result._id);
            GmfScores.create({ user_id: ObjectId(result._id), user_score: 0 })

        });
    }
    catch (e) {
        console.log(e);
    }
    finally {
        jwt.sign(user, 'fiveberg_secret_key', { expiresIn: '30000s' }, (err, token) => {
            if (err) {
                res.sendStatus(500)
                next(err)
            }
            res.status(200).json({
                token
            });
        });
    }
});

User.post('/login', (req, res, next) => {
    const user = req.body
    console.log(user);

    try {
        model.findOne({ email: user.email }, function (err, userData) {
            console.log(userData);

            if (userData) {

                if (bcrypt.compareSync(user.password, userData.password)) {
                    jwt.sign(user, 'fiveberg_secret_key', { expiresIn: '30000s' }, (err, token) => {
                        if (err) {
                            res.sendStatus(500)
                            next(err)
                        }
                        res.status(200).json({
                            token
                        });
                    });

                }
                else {
                    console.log("error");

                }
                /* bcrypt.compare(user.password, userData.password, function (err, res) {
                    // res === true
                    if (!err) {
                        jwt.sign(user, 'fiveberg_secret_key', { expiresIn: '30000s' }, (err, token) => {
                            if (err) {
                                res.sendStatus(500)
                                next(err)
                            }
                            res.status(200).json({
                                token
                            });
                        });
                    }
                    else {
                        console.log(err);

                    }
                }); */

            }
        });
    }
    catch (e) {
        console.log(e);
    }
    finally {

    }
});

User.get('/score', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            model.findOne({ email: data.email }, function (err, userData) {
                console.log(userData);

                GmfScores.findOne({ user_id: ObjectId(userData._id) }, function (err, result) {
                    console.log(result);

                    res.send({ data: result.user_score })
                })

            })
        }
    })
})

module.exports = User //export 
