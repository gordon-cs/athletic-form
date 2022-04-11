import pytest_components
import pytest

# @pytest.mark.skip("Reduce Spam")
def test_sendEmail():
    #Make sure you replace the from email and password below before
    #running this
    fromEmail = "first.last@gordon.edu"
    password = "password"
    emails = "aidan.perez@gordon.edu,jacob.christopher@gordon.edu,josiah.kangas@gordon.edu,hudson.finn@gordon.edu"
    url = "/Email/" + fromEmail + "/" + password + "/" + emails + "/20"
    data = {
        "fromEmail": fromEmail,
        "password": password,
        "emails": emails,
        "number": 20
    }
    response = pytest_components.post(url, data)
    assert response.status_code == 200
