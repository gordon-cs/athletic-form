import requests
import test_athleticForm_pytest
import json

def get(url):
    fullUrl = test_athleticForm_pytest.hostUrl + url
    return requests.get(fullUrl)

def post(url, data):
    fullUrl = test_athleticForm_pytest.hostUrl + url
    return requests.post(fullUrl, data = data, headers = {'Content-Type': 'application/json'})