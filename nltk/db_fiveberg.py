# Taleh Muzaffarov
import pymongo

myclient = pymongo.MongoClient("mongodb://mongo:27017/")
mydb = myclient["fiveberg"]
news = mydb["news"]


def get_content():
    articles = []
    for x in news.find({'category': '5e079a883519582ccea67b15'}, {"_id": 1, "content": 1}):
        articles.append(x)
    return articles


if __name__ == '__main__':
    get_content()
