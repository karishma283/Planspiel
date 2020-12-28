//Taleh Muzaffarov

const express = require('express'),
    Quizes = express.Router(),
    NewsModel = require('../models/newsModel'),
    userModel = require('../models/user'),
    QuizFG = require('../models/quizFGModel'),
    QuizModel = require('../models/quizesModel')
jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    verifyToken = require('../exports/VerifyToken')
const ObjectId = require("mongoose").Types.ObjectId;
var QuizMC = require('../models/quizMCModel');
var GmfScores = require('../models/userScores')
Quizes.post('/list', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            userModel.find({ email: data.email }, { "_id": 0, "quizes": 1, "category": 1 }, function (err, results) {
                /* console.log(results[0]); */
                NewsModel.find({
                    $and: [
                        { _id: { $nin: results[0].quizes } },
                        { category: { $in: results[0].category } }
                    ]
                },
                    { _id: 1, title: 1, category: 1, url: 1 },
                    function (err, news) {

                        res.send(news)
                    })
                /* quizesModel.aggregate([
                    {
                        $lookup: {
                            from: "quiz_fg",
                            localField: "_id",
                            foreignField: "quiz_id",
                            as: "fg"
                        }
                    },
                    {
                        $lookup: {
                            from: "quiz_mc",
                            localField: "_id",
                            foreignField: "quizes_id",
                            as: "mc"
                        }
                    },
                    { $project: { items: { $concatArrays: ["$mc", "$fg"] } } },
    
                ], function (err, results) {
                    //res.send(results)
                    console.log(results);
    
                }) */
            });
        }
    });
});
function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index[0]);
    let lastPart = origString.substr(index[1]);

    let newString = firstPart + replaceChar + lastPart;
    return newString;
}

Quizes.post('/fetch', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            id = req.body.id
            data = []
            /*  QuizModel.find({
                 article_id: ObjectId(id)
             }, function (err, quizes) {
                 quizes.forEach(quiz => {
 
                 });
                 console.log(results);
 
             }) */
            QuizModel.aggregate([
                { $match: { article_id: ObjectId(id) } },
                {
                    $lookup: {
                        from: "quiz_fg",
                        localField: "_id",
                        foreignField: "quiz_id",
                        as: "fg"
                    }
                },
                {
                    $lookup: {
                        from: "quiz_mc",
                        localField: "_id",
                        foreignField: "quiz_id",
                        as: "mc"
                    }
                },
                { $project: { items: { $concatArrays: ["$mc", "$fg"] }, text: 1, article_id: 1 } },

            ], function (err, quizes) {
                //res.send(results)
                quizes.forEach(quiz => {
                    quiz.items = quiz.items[Math.floor(Math.random() * quiz.items.length)]
                    delete quiz.items.answer
                    quiz.text = replaceChar(quiz.text, ' ..... ', quiz.items.index)

                    data.push(quiz)
                });
                res.send(data)



            })

        }
    });
});

Quizes.post('/check_answers', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'fiveberg_secret_key', (err, data) => {
        if (err) {
            res.sendStatus(403);
            next(err)
        } else {
            answers = req.body.data;
            let table = null
            let gained_score = 0
            global.result = []

            answers.forEach((quiz, i) => {


                if (quiz.type === "mc") {
                    table = "quiz_mc"
                }
                else {
                    table = "quiz_fg"
                }


                QuizModel.aggregate([
                    { $match: { _id: ObjectId(quiz.quiz_id) } },
                    {
                        $lookup: {
                            from: table,
                            localField: "_id",
                            foreignField: "quiz_id",
                            as: "fg"
                        }
                    },
                    {
                        $project: {
                            items: {
                                $filter: {
                                    input: "$fg",
                                    as: "item",
                                    cond: { $eq: ["$$item._id", ObjectId(quiz.type_id)] }
                                }
                            },
                            _id: 0,
                        }
                    },

                    { $unwind: "$items" },

                ], function (err, quizes) {
                    console.log(quizes);

                    delete quizes[0].items._id
                    delete quizes[0].items.choices
                    delete quizes[0].items.index
                    delete quizes[0].items.quiz_id
                    var correctAnswer = quizes[0].items.answer;
                    var quizPoint = quizes[0].items.points
                    if (correctAnswer.toLowerCase() === quiz.answer) {
                        result.push({ userAnswer: quiz.answer, correctAnswer: correctAnswer, score: quizPoint })
                        userModel.findOne({ email: data.email }, { category: 0, quizes: 0, firstname: 0, lastname: 0 }, function (err, user) {
                            GmfScores.update({ user_id: ObjectId(user._id) },
                                {
                                    $inc: {
                                        user_score: quizPoint
                                    }
                                })

                        })
                    }
                    else {
                        result.push({ userAnswer: quiz.answer, correctAnswer: correctAnswer, score: 0 })
                    }

                })
            })

            setTimeout(() => {
                console.log(result);
                res.send({ data: result })
            }, 5000);


        }
    })
})


module.exports = Quizes;


