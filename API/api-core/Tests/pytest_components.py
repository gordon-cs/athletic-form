import requests
import test_athleticForm_pytest

def get(url):
    fullUrl = test_athleticForm_pytest.hostUrl + url
    return requests.get(fullUrl)