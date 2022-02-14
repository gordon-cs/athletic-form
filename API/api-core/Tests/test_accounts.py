import pytest_components
import pytest

def test_getAccounts():
    response = pytest_components.get("/Accounts")
    assert response.status_code == 200
    response_body = response.json()
    assert len(response_body) > 0

def test_getStudentsEnrolledIn():
    response = pytest_components.get("/Accounts/StudentsEnrolledIn/anthony.aardvark@gordon.edu")
    assert response.status_code == 200
    response_body = response.json()
    assert len(response_body) == 2
    assert response_body[0]["gordon_ID"] == "50208495"
    assert response_body[0]["nickname"] == "Anth"
    assert response_body[0]["firstName"] == "Anthony"
    assert response_body[0]["lastName"] == "Aardvark"
    assert response_body[0]["email"] == "Anthony.Aardvark@gordon.edu"
    assert response_body[0]["iD_NUM"] == 50208495
    assert response_body[0]["yR_CDE"] == "2021"
    assert response_body[0]["trM_CDE"] == "SP"
    assert response_body[0]["crS_CDE"].strip() == "CPS353"

    assert response_body[1]["gordon_ID"] == "50208495"
    assert response_body[1]["nickname"] == "Anth"
    assert response_body[1]["firstName"] == "Anthony"
    assert response_body[1]["lastName"] == "Aardvark"
    assert response_body[1]["email"] == "Anthony.Aardvark@gordon.edu"
    assert response_body[1]["iD_NUM"] == 50208495
    assert response_body[1]["yR_CDE"] == "2021"
    assert response_body[1]["trM_CDE"] == "FA"
    assert response_body[1]["crS_CDE"].strip() == "COM101"
    