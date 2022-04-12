import pytest_components
import pytest

def test_getStudentsEnrolledIn():
    response = pytest_components.get("/Accounts/StudentsEnrolledIn/aidan.perez@gordon.edu/2021/SP")
    assert response.status_code == 200
    response_body = response.json()
    assert len(response_body) > 0
    