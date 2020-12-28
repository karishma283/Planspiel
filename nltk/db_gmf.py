# Taleh Muzaffarov
import pymongo
import json


def writeToMc(db, word, id):
    table = db["quiz_mc"]
    query = {"quiz_id": id, "answer": word["word"],
             "index": word["index"], "choices": word["choices"], "points": 5}
    result = table.insert_one(query)


def writeToFg(db, word, id):
    table = db["quiz_fg"]
    query = {"quiz_id": id,
             "answer": word["word"], "index": word["index"], "points": 15}
    result = table.insert_one(query)


def writeToQuizes(db, id, sentence):
    table = db["quizes"]
    query = {"article_id": id,
             "text": sentence}
    result = table.insert_one(query)
    return result.inserted_id


def writeGMF(data):
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    db = myclient["fiveberg"]
    for single_article_data in data:
        single_article_data = dict(single_article_data)
        id = single_article_data["_id"]
        for question in single_article_data["questions"]:
            sentence = question["sentence"]
            quiz_id = writeToQuizes(db, id, sentence)
            for word in question["words"]:
                if word["type"] == "fg":
                    writeToFg(db,
                              word, quiz_id)
                elif word["type"] == "mc":
                    writeToMc(db,
                              word, quiz_id)


if __name__ == "__main__":
    writeGMF()


# gmf_scores
# { "_id":34534sdf, user_id:" sdfsd", user_score:325 }

# gmf_quiz_history
# { "_id", "user_id", history:""}

# discounts
# { "_id": 1234, "points": 100, "providers_ids":8}

# providers
# { "_id":1234, "name": "MC Donalds", "text": "Get MC Donalds dicsount", "img":"img.png"}

# discount_codes
# { "_id":1234, "provider_id": 1, codes:[1,2,3,4,5] }


# subscription
# {"_id":sdfsd, "user_id":, provider_id, expiration_date, activation_date}
# proiders
# {"_id", "name"}
