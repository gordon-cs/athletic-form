import requests
import test_athleticForm_pytest
import json

def get(url):
    fullUrl = test_athleticForm_pytest.hostUrl + url
    return requests.get(fullUrl)
    # To run without SSL Certificate
    # return requests.get(fullUrl, verify=False)

def post(url, data):
    fullUrl = test_athleticForm_pytest.hostUrl + url
    return requests.post(fullUrl, data = data, headers = {'Content-Type': 'application/json'})
    # To run without SSL Certificate
    # return requests.post(fullUrl, data = data, headers = {'Content-Type': 'application/json'}, verify=False)
    