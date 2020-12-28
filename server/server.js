//const http = require('http');
// Taleh Muzaffarov
const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const compression = require('compression');
const morgan = require('morgan')
const app = express();
const server = createServer(app)
const dev = app.get('env') !== 'production'
const News = require('./routes/News')
const User = require('./routes/User')
const Podcast = require('./routes/Podcast')
const Article = require('./routes/Article')
const Quizes = require('./routes/Quizes')

const Channels = require('./routes/Channels')
const Categories = require('./routes/Categories')
require('dotenv').config()
var url = "mongodb://mongo:27017/fiveberg"
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("fiveberg");
    var articles = [{ "_id": { "$oid": "5e84be18ea7db85c43c55b5f" }, "category": "", "img": "", "title": "", "url": "", "desc": "", "content": "", "publish_date": "2016-01-01T00:00:00.000Z", "update_date": "2016-01-01T00:00:00.000Z", "__v": 0 }
    ];
    var categories = [{ "_id": { "$oid": "5e079a883519582ccea67b15" }, "name": "Entertainment", "desc": "Entertainment News", "__v": 0 },
    { "_id": { "$oid": "5e135cc94cde8b6fd850f554" }, "name": "Technology", "desc": "Technology News", "__v": 0 },
    { "_id": { "$oid": "5e135cc94cde8b6fd850f555" }, "name": "Politics", "desc": "Politics News", "__v": 0 },
    { "_id": { "$oid": "5e135cc94cde8b6fd850f556" }, "name": "Sport", "desc": "Sport News", "__v": 0 },
    { "_id": { "$oid": "5e135cc94cde8b6fd850f557" }, "name": "World", "desc": "World News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9b0" }, "name": "Traffic", "desc": "Traffic News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9af" }, "name": "Weather", "desc": "Weather News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9b1" }, "name": "Health", "desc": "Health News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9b2" }, "name": "Nature", "desc": "Nature News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9b3" }, "name": "Europe", "desc": "Europe News", "__v": 0 },
    { "_id": { "$oid": "5e860cf7146d253aad83d9b4" }, "name": "Magazine", "desc": "Magazine News", "__v": 0 }
    ]
    var channels = [{ "_id": { "$oid": "5e3c37225469e720dc8d5361" }, "category": { "$oid": "5e135cc94cde8b6fd850f556" }, "img": "https://pngriver.com/wp-content/uploads/2018/04/Download-Sport-PNG-Pic.png", "name": "2020 Chempionship", "desc": "Analyzing all the matches", "publish_date": { "$date": "2020-02-06T15:56:18.880Z" }, "update_date": { "$date": "2020-02-06T15:56:18.880Z" }, "__v": 0 },
    { "_id": { "$oid": "5e3c377b33fd72212429c447" }, "category": { "$oid": "5e135cc94cde8b6fd850f554" }, "img": "https://upload.wikimedia.org/wikipedia/de/e/e3/Logo_TU_Chemnitz.svg", "name": "TU Chemnitz", "desc": "Latest news in TU Chemnitz", "publish_date": { "$date": "2020-02-06T15:57:47.632Z" }, "update_date": { "$date": "2020-02-06T15:57:47.632Z" }, "__v": 0 },
    { "_id": { "$oid": "5e3c5954f2dd632668917a8e" }, "category": { "$oid": "5e135cc94cde8b6fd850f556" }, "img": "https://www.fiveberg.de/assets/images/logo_skyblue.png", "name": "Fiveberg Innovations", "desc": "Latest Trends on news industry", "publish_date": { "$date": "2020-02-06T15:57:47.632Z" }, "update_date": { "$date": "2020-02-06T15:57:47.632Z" }, "__v": 0 }
    ]
    var discount_codes = [{ "_id": { "$oid": "5e7a0199fd9e167c260baa0b" }, "discount_id": { "$oid": "5e7a00fbdcfe42a29a8e6c66" }, "codes": [1, 2, 3, 4, 5] }
    ]
    var discounts = [{ "_id": { "$oid": "5e7a013d0f2bb1df2d4c1868" }, "points": 100, "providers_id": { "$oid": "5e7a0109256830decf594395" } },
    { "_id": { "$oid": "5e7a015d57cb8c19824994c4" }, "points": 200, "providers_id": { "$oid": "5e7a01c75500a24fc2208d9f" } },
    { "_id": { "$oid": "5e9083109a3724754662a66f" }, "points": 300, "providers_id": { "$oid": "5e7a0109256830decf594395" } }
    ]
    var gmf_quiz_history = [{ "_id": { "$oid": "5e7a00822506fa45b4dddcbb" }, "user_id": { "$oid": "5e11e61b42b0712627a9cc53" }, "history": "Earned 13 points from Article" }
    ]
    var gmf_scores = [{ "_id": { "$oid": "5e79fd3d69fb202cd4e350ec" }, "user_id": { "$oid": "5e989810ea0e971b970f72fc" }, "user_score": 153 },
    { "_id": { "$oid": "5e98a4193b04cc2fda228f93" }, "user_id": { "$oid": "5e98a3abc9434d2f8af58555" }, "user_score": 7, "__v": 0 }
    ]
    var news = [{ "_id": { "$oid": "5e135d0fe8318a7061733adb" }, "category": { "$oid": "5e135cc94cde8b6fd850f554" }, "img": "https://pics.freiepresse.de/DYNIMG/90/99/7099099_M650x433.jpg", "title": "Stollberg bekommt einen Mobilitätsmanager", "url": "wo-es-in-westsachsen-am-haeufigsten-schuettet", "desc": "The lawyer Robert Abela takes over the power of Prime Minister Joseph Muscat in Malta. His election as party leader is a surprise because the 42-year-old has not been in parliament for long. It stands for renewal - at least in moderation.", "content": "The lawyer Robert Abela takes over the power of Prime Minister Joseph Muscat in Malta. His election as party leader is a surprise because the 42-year-old has not been in parliament for long. It stands for renewal - at least in moderation. Valletta (dpa) - The new prime minister, Robert Abela, wants to polish up Malta's image, which has been damaged by allegations of corruption and the murder of a journalist.  He would strengthen the rule of law, the 42-year-old promised on Sunday evening in his inaugural speech as head of the Labor Party in Paola near Valletta. \"We have learned from our mistakes and they will not be repeated,\" he said without being specific. More than two years after the murder of the critical blogger Daphne Caruana Galizia, Abela replaces the ailing Prime Minister Joseph Muscat .  The Social Democratic Labor Party had elected the lawyer and deputy on Saturday. In the small EU country, it is common for the head of the majority group in parliament to lead the government. Abela's swearing-in in Valletta was expected this Monday.   The decision of the party members was a surprise. Abela has only been in parliament since 2017. The lawyer, who is hardly known abroad, on the one hand stands for a fresh start for supporters. At the same time, his father George Abela was formerly President of the State. Abela himself had provided legal advice to the government.  He recently sent out signals of continuity, because the number of Muscat fans is still large. Local media said that he wanted to involve them. In his speech of Sunday, which was accompanied by much applause, he said that he would continue Muscat's political projects.  His predecessor had been hit by the murder of blogger Daphne Caruana Galizia. Outraged citizens accused him of protests, among other things, to cover backers of the deed. Several politicians around Muscat, including his chief of staff, had to resign.  The journalist was blown up in her car on October 16, 2017. The then 53-year-old had researched corruption among the government and business people in Malta .  The European Union had put pressure to solve the murder quickly. The EU Parliament announced in late November that it would review the rule of law in the Mediterranean country.  Muscat (45) congratulated Abela right after his victory. He wrote on Twitter that he was proud to hand over the premier's office to his successor. In the vote, Abela prevailed with around 58 percent of the vote against the favorite Vice Prime Minister Chris Fearne (56).  Muscat announced its retreat in December. Previously, the alleged backer of the murder had been arrested in November 2019, an entrepreneur who is said to have had contacts with Muscat's ex-chief of staff. This resigned. He was also arrested, but was released and pleaded innocent.  Muscat had been the Labor leader since 2008 - he had then defeated Abela's father George. He took office as prime minister in 2013.  He remained on the road to success for a long time: the economy boomed, the population grew. Revelations about secret deals in Malta through the so-called Panama Papers marked a turning point in 2016. In early elections in June 2017, he was nevertheless confirmed in office with a large majority. But after the attack on the journalist, the tide turned.  During the election campaign, Robert Abela announced that he would be heavily involved in social issues for the approximately 500,000 inhabitants of Malta, such as affordable housing.", "publish_date": { "$date": "2020-01-06T16:15:11.187Z" }, "update_date": { "$date": "2020-01-06T16:15:11.187Z" }, "__v": 0 }]
    var podcasts = [{ "_id": { "$oid": "5e441ee523af6c1f1f46a263" }, "channel": { "$oid": "5e3c37225469e720dc8d5361" }, "episode": 1, "length": 10.0, "title": "2020 Chempionship: Barcelona - Real Madrid ", "source": "http://www.nihilus.net/soundtracks/Static%20Memories.mp3", "desc": "Very active game held on 06.02.2020", "publish_date": { "$date": "2020-02-12T15:51:01.256Z" }, "update_date": { "$date": "2020-02-12T15:51:01.256Z" }, "__v": 0 },
    { "_id": { "$oid": "5e441f3423af6c1f1f46a264" }, "channel": { "$oid": "5e3c377b33fd72212429c447" }, "episode": 1, "length": 20.0, "title": "Fiveberg got into news industry with latest IT technologies", "source": "http://www.nihilus.net/soundtracks/Static%20Memories.mp3", "desc": "What problems does Fiveberg solve ?", "publish_date": { "$date": "2020-02-12T15:52:20.318Z" }, "update_date": { "$date": "2020-02-12T15:52:20.318Z" }, "__v": 0 },
    { "_id": { "$oid": "5e441f3523af6c1f1f46a265" }, "channel": { "$oid": "5e3c5954f2dd632668917a8e" }, "episode": 1, "length": 17.0, "title": "2020 Chempionship: Barcelona - Real Madrid ", "source": "http://www.nihilus.net/soundtracks/Static%20Memories.mp3", "desc": "Very active game held on 06.02.2020", "publish_date": { "$date": "2020-02-12T15:52:21.990Z" }, "update_date": { "$date": "2020-02-12T15:52:21.990Z" }, "__v": 0 },
    { "_id": { "$oid": "5e441f3723af6c1f1f46a266" }, "channel": { "$oid": "5e3c377b33fd72212429c447" }, "episode": 1, "length": 3.0, "title": "2020 Chempionship: Barcelona - Real Madrid ", "source": "http://www.nihilus.net/soundtracks/Static%20Memories.mp3", "desc": "Very active game held on 06.02.2020", "publish_date": { "$date": "2020-02-12T15:52:23.736Z" }, "update_date": { "$date": "2020-02-12T15:52:23.736Z" }, "__v": 0 },
    { "_id": { "$oid": "5e441f3923af6c1f1f46a267" }, "channel": { "$oid": "5e3c5954f2dd632668917a8e" }, "episode": 1, "length": 8.0, "title": "2020 Chempionship: Barcelona - Real Madrid ", "source": "http://www.nihilus.net/soundtracks/Static%20Memories.mp3", "desc": "Very active game held on 06.02.2020", "publish_date": { "$date": "2020-02-12T15:52:25.503Z" }, "update_date": { "$date": "2020-02-12T15:52:25.503Z" }, "__v": 0 }
    ]
    var providers = [{ "_id": { "$oid": "5e7a00fbdcfe42a29a8e6c66" }, "name": "MC Donalds", "text": "Get MC Donalds dicsount", "img": "img.png" },
    { "_id": { "$oid": "5e7a0109256830decf594395" }, "name": "H\u0026M", "text": "Get H\u0026M dicsount", "img": "img.png" }
    ]
    var publishers = [{ "_id": { "$oid": "5e84bc85ea7db85c43c55b57" }, "name": "Freie Presse", "redirect_url": "http://freie-presse.de" },
    { "_id": { "$oid": "5e84bc87ea7db85c43c55b59" }, "name": "Freie Presse", "redirect_url": "http://freie-presse.de" }
    ]
    var quizes = [{ "_id": { "$oid": "5e6e67ce47aa0d7c88496b25" }, "article_id": { "$oid": "5e135d0fe8318a7061733adb" }, "text": "Ab Freitagabend haben Theater und Stadthalle geschlossen, ab dem morgigen Samstag alle anderen Einrichtungen wie Tierpark, Museen, Schwimm- und Sporthallen." },
    { "_id": { "$oid": "5e6e67ce47aa0d7c88496b2e" }, "article_id": { "$oid": "5e135d0de8318a7061733ada" }, "text": "Das Rathaus erlässt zudem eine Allgemeinverfügung, mit der Veranstaltungen ab 1000 Besucher verboten werden." }
    ]
    var quiz_fg = [{ "_id": { "$oid": "5e6e67ce47aa0d7c88496b26" }, "quiz_id": { "$oid": "5e6e67ce47aa0d7c88496b25" }, "answer": "Freitagabend", "index": [3, 15], "points": 13 },
    { "_id": { "$oid": "5e6e67ce47aa0d7c88496b2a" }, "quiz_id": { "$oid": "5e135d0fe8318a7061733adb" }, "answer": "Einrichtungen", "index": [95, 108], "points": 13 },
    { "_id": { "$oid": "5e6e67ce47aa0d7c88496b2d" }, "quiz_id": { "$oid": "5e6e67ce47aa0d7c88496b25" }, "answer": "Schwimm", "index": [131, 138], "points": 13 }
    ]
    var quiz_mc = [{ "_id": { "$oid": "5e986fddddfc2514dc05cf11" }, "quiz_id": { "$oid": "5e6e67ce47aa0d7c88496b25" }, "answer": "Samstag", "index": [74, 81], "choices": ["samstag", "stockhausen", "operas", "opera"], "points": 7 },
    { "_id": { "$oid": "5e6e67ce47aa0d7c88496b2b" }, "quiz_id": { "$oid": "5e6e67ce47aa0d7c88496b25" }, "answer": "Tierpark", "index": [113, 121], "choices": ["tierpark", "madrid", "lyon", "hudson county"], "points": 7 },
    { "_id": { "$oid": "5e6e67ce47aa0d7c88496b2f" }, "quiz_id": { "$oid": "5e6e67ce47aa0d7c88496b2e" }, "answer": "Rathaus", "index": [4, 11], "choices": ["rathaus", "facade", "buildings", "courtyard"], "points": 7 }
    ]
    var users = [{ "_id": { "$oid": "5e989810ea0e971b970f72fc" }, "category": [{ "$oid": "5e079a883519582ccea67b15" }, { "$oid": "5e135cc94cde8b6fd850f554" }, { "$oid": "5e135cc94cde8b6fd850f555" }, { "$oid": "5e135cc94cde8b6fd850f557" }, { "$oid": "5e135cc94cde8b6fd850f556" }, { "$oid": "5e860cf7146d253aad83d9b0" }, { "$oid": "5e860cf7146d253aad83d9b1" }, { "$oid": "5e860cf7146d253aad83d9b2" }], "quizes": [], "firstname": "Taleh", "lastname": "Muzaffarov", "email": "talehmuzaffer@gmail.com", "password": "$2a$10$b20HtT9Vo2GnXj1VuBL6DOc2yNFEypZtlMW9jnMhNLyCjGcwXKlSq", "__v": 0 },
    { "_id": { "$oid": "5e98a3abc9434d2f8af58555" }, "category": [{ "$oid": "5e079a883519582ccea67b15" }, { "$oid": "5e135cc94cde8b6fd850f554" }, { "$oid": "5e135cc94cde8b6fd850f557" }], "quizes": [], "firstname": "test", "lastname": "test", "email": "test@gmail.com", "password": "$2a$10$Xx1HyjD0qSKnaIhG6g.1.OQJJ60xQpZ4f3aqfMzqji66LjU9WD6ym", "__v": 0 },
    { "_id": { "$oid": "5e98a4193b04cc2fda228f92" }, "category": [], "quizes": [], "firstname": "test", "lastname": "test", "email": "tere@gmail.com", "password": "$2a$10$cElsz2uNW8tnPflw/ivyqOGymYKjf32b5DABouW3qKQjI8qwHZ.aC", "__v": 0 }
    ]
    dbo.collection("articles").insertMany(articles, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("categories").insertMany(categories, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("quiz_mc").insertMany(quiz_mc, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("quizes").insertMany(quizes, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("publishers").insertMany(publishers, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("podcasts").insertMany(podcasts, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("providers").insertMany(providers, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("news").insertMany(news, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("quiz_fg").insertMany(quiz_fg, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("gmf_scores").insertMany(gmf_scores, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("discounts").insertMany(discounts, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("discount_codes").insertMany(discount_codes, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("channels").insertMany(channels, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("gmf_quiz_history").insertMany(gmf_quiz_history, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    dbo.collection("users").insertMany(users, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/* Allows all cors options */
app.options('*', cors());
/* const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}); */


app.use(compression());
app.use(morgan('common'));
app.use(express.static(path.resolve(__dirname, 'www')));
app.get('/'
    , (req, res) => {
        res.sendFile(path.resolve(__dirname, 'www', 'index.html'))
    })

app.use('/api/news', News)
app.use('/api/podcast', Podcast)
app.use('/api/channels', Channels)
app.use('/api/user', User)
app.use('/api/article', Article)
app.use('/api/quizes', Quizes)

app.use('/api/categories', Categories)
server.listen(process.env.PORT || 5000, '0.0.0.0', () => {
    console.log(`Server Started `);
});
process.on('uncaughtException', err => {
    console.log(err);
})

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); });
