from urllib import request
from bs4 import BeautifulSoup as bs
import re
import nltk
import json
import heapq
import numpy as np
from cortical import get_choices


def construct(sentence):
    matched_words = []
    matches = re.finditer(
        r"(\b[A-Z][a-z]+\b)|(\b[A-Z0-9]+\b)", sentence)
    for match in matches:
        if match.start() > 0 and len(match.group()) > 2 and sentence[match.start()-1] != '.':
            matched_words.append(match)
    i = 0
    specialWords = []
    for match in matched_words:
        word = match.group()
        index = match.span()
        if len(matched_words)-1 > i:
            end = match.end()
            start = matched_words[i+1].start()
            if end+1 == start and match.start()-1 == matched_words[i-1].end():
                currentspecial = specialWords[len(specialWords)-1]
                currentspecial["word"] += ' ' + \
                    matched_words[i+1].group()
                currentspecial["index"] = (
                    currentspecial["index"][0], matched_words[i+1].end())

            elif end+1 == start:
                specialWords.append({"word": word})
                currentspecial = specialWords[len(specialWords)-1]
                currentspecial["word"] = word+' ' + \
                    matched_words[i+1].group()
                currentspecial["index"] = (
                    match.start(), matched_words[i+1].end())

            elif match.start()-1 == matched_words[i-1].end():
                print(None)
            else:
                specialWords.append({"word": word, "index": index})
            i += 1
        elif len(matched_words) == 1:
            specialWords.append({"word": word, "index": index})

    specialWords.append({"sentence": sentence})
    data = {"words": []}
    for specialWord in specialWords:
        if "word" in specialWord.keys():
            data["words"].append(specialWord)
        else:
            data["sentence"] = specialWord["sentence"]
    k = 0
    for word in data["words"]:
        choices = get_choices(word["word"], data["sentence"])
        if choices is None:
            data["words"][k]["type"] = "fg"
        else:
            data["words"][k]["type"] = "mc"
            data["words"][k]["choices"] = choices
        k += 1
    return data


def fetchContent(content):
    # url = "https://en.wikipedia.org/wiki/Coronavirus"
    # htmlDoc = request.urlopen(url)
    # with open('text.txt', 'r') as text:
    # htmlDoc = text.read()
    soupObject = bs(content, 'html.parser')
    paragraphContents = soupObject.findAll('div')
    return paragraphContents


def cleanedData(paragraphContents):
    allParagraphContents = ""

    for paragraphContent in paragraphContents:
        allParagraphContents += paragraphContent.text

    allParagraphContents_cleanedData = re.sub(
        r'\[[0-9]*\]', ' ', allParagraphContents)
    allParagraphContents_cleanedData = re.sub(
        r'\s+', ' ', allParagraphContents_cleanedData)

    sentences_tokens = nltk.sent_tokenize(allParagraphContents_cleanedData)

    allParagraphContents_cleanedData = re.sub(
        r'[^a-zA-Z]', ' ', allParagraphContents_cleanedData)
    allParagraphContents_cleanedData = re.sub(
        r'\s+', ' ', allParagraphContents_cleanedData)
    return allParagraphContents_cleanedData, sentences_tokens


def wordFrequencies(allParagraphContents_cleanedData, sentences_tokens):

    words_tokens = nltk.word_tokenize(allParagraphContents_cleanedData)

    stopwords = nltk.corpus.stopwords.words('english')

    word_frequencies = {}

    for word in words_tokens:
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1
    return word_frequencies


def sentencesScores(allParagraphContents_cleanedData, sentences_tokens, word_frequencies):
    maximum_frequency_word = max(word_frequencies.values())

    for word in word_frequencies.keys():
        word_frequencies[word] = (
            word_frequencies[word]/maximum_frequency_word)

    sentences_scores = {}

    for sentence in sentences_tokens:
        for word in nltk.word_tokenize(sentence):
            if word in word_frequencies.keys():
                if (len(sentence.split(' '))) < 30:
                    if sentence not in sentences_scores.keys():
                        sentences_scores[sentence] = word_frequencies[word]
                    else:
                        sentences_scores[sentence] += word_frequencies[word]
    return sentences_scores


def summary(allParagraphContents_cleanedData, sentences_tokens, sentences_scores):
    length = len(allParagraphContents_cleanedData.split(" "))

    if length <= 350:
        numberOfSentence = 1
    elif length >= 350 and length <= 700:
        numberOfSentence = 2
    else:
        numberOfSentence = 3

    summary_MachineLearning = heapq.nlargest(
        numberOfSentence, sentences_scores, key=sentences_scores.get)
    single_article_questions = []
    for summary in summary_MachineLearning:
        record = construct(summary)
        single_article_questions.append(record)
    return single_article_questions


###


def nltk_generate(articles):
    data = []
    single_article = {}
    for article in articles:
        single_article["_id"] = str(article["_id"])
        paragraphContents = fetchContent(article["content"])
        allParagraphContents_cleanedData, sentences_tokens = cleanedData(
            paragraphContents)
        word_frequencies = wordFrequencies(
            allParagraphContents_cleanedData, sentences_tokens)
        sentences_scores = sentencesScores(
            allParagraphContents_cleanedData, sentences_tokens, word_frequencies)
        single_article_questions = summary(allParagraphContents_cleanedData,
                                           sentences_tokens, sentences_scores)
        single_article["questions"] = single_article_questions
        #single_article = json.loads(single_article)
        data.append(single_article)

    return data


if __name__ == '__main__':
    nltk_generate()
