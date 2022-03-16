from email.mime import base
import pytest_components

def test_getYear():
    baseUrl = "/YearTerm/year/"
    response1 = pytest_components.get(baseUrl + "2021-01-01")
    assert response1.status_code == 200
    year1 = response1.content
    year1 = year1.decode()
    assert year1 == "2020"
    response2 = pytest_components.get(baseUrl + "2021-06-14")
    assert response2.status_code == 200
    year2 = response2.content
    year2 = year2.decode()
    assert year2 == "2020"
    response3 = pytest_components.get(baseUrl + "2021-07-04")
    year3 = response3.content
    year3 = year3.decode()
    assert year3 == "2021"
    response4 = pytest_components.get(baseUrl + "2021-12-25")
    year4 = response4.content
    year4 = year4.decode()
    assert year4 == "2021"

def test_getTerm():
    baseUrl = "/YearTerm/term/"
    response1 = pytest_components.get(baseUrl + "2021-01-01")
    assert response1.status_code == 200
    term1 = response1.content
    term1 = term1.decode()
    assert term1 == "SP"
    response2 = pytest_components.get(baseUrl + "2021-06-14")
    assert response2.status_code == 200
    term2 = response2.content
    term2 = term2.decode()
    assert term2 == "SP"
    response3 = pytest_components.get(baseUrl + "2021-07-04")
    term3 = response3.content
    term3 = term3.decode()
    assert term3 == "FA"
    response4 = pytest_components.get(baseUrl + "2021-12-25")
    term4 = response4.content
    term4 = term4.decode()
    assert term4 == "FA"