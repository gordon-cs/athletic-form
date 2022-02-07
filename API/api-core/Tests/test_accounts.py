import pytest_components
import pytest

def test_getAccounts():
    response = pytest_components.get("/Accounts")
    assert response.status_code == 200
    response_body = response.json()
    assert len(response_body) > 0