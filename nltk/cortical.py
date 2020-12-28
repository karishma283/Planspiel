# Taleh Muzaffarov
import requests
import json
from datetime import datetime
import os
import sys
import re
import time
from subprocess import Popen, PIPE


def sendRequest(url, method, body):
    api_key = '3049de80-5491-11ea-8f72-af685da1b20e'
    cmd = [
        'curl',
        '-k',
        '-X',
        method,
        '-H', api_key,
        '-H', 'Content-Type: application/json',
        url,
        '-d', body]
    p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    output, err = p.communicate(
        b"input data that is passed to subprocess' stdin")
    return output


def renderSimilarTerms(quota, response):
    keywords = []
    for keyword in response:
        keywords.append(keyword['term'])

    return keywords


def corticalApiwithTerm(term, pos_type, quota, content):
    start_index = 0
    url = 'http://api.cortical.io:80/rest/expressions/similar_terms?retina_name=en_associative&start_index={}&max_results={}&pos_type={}&sparsity=1.0&get_fingerprint=false'.format(
        start_index, quota, pos_type)
    terms = []
    body = {'and': [
        {'text': content},
        {'and': {'term': term}}]}
    body = json.dumps(body)
    try:
        response = sendRequest(url, 'POST', body)
        response = json.loads(response)
        return renderSimilarTerms(quota, response)
    except Exception as e:
        return


def get_pos_type(term):
    url = 'http://api.cortical.io:80/rest/terms?retina_name=en_associative&term=coronavirus&start_index=0&max_results=10&get_fingerprint=false'
    response = sendRequest(url, 'GET', '')
    response = json.loads(response)
    return response[0]['pos_types'][0]


def get_choices(term, content):
    time.sleep(7)
    pos_type = get_pos_type(term)
    time.sleep(7)
    numberOfChoices = 4
    choices = corticalApiwithTerm(term, pos_type, numberOfChoices, content)
    return choices


if __name__ == '__main__':
    get_choices()
# okay decompiling __pycache__/cortical.cpython-36.pyc
