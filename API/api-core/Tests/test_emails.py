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
    response = pytest_components.get(url)
    assert response.status_code == 200
    emailInformation = response.json()
    assert len(emailInformation) == 4
    for email in emailInformation:
        assert email["toEmails"][0]["displayName"] == ""
        assert email["toEmails"][0]["host"] == "gordon.edu"
        assert email["subject"] == "Athletic Conflicts"
        report = email["body"]
        assert report.startswith("<h1>Athletic Conflicts</h1>")
        assert "<p>Here is a list of the students who will be missing class this week due to athletic events and their approval status.</p>" in report
        assert "<table>" in report
        assert "<tr>" in report
        assert "<th>Name</th>" in report
        assert "<th>Email</th>" in report
        assert "<th>Event</th>" in report
        assert "<th>Approval Status</th>" in report
        assert "</tr>" in report
        assert report.endswith("</table>")
        assert email["isBodyHtml"]
    assert emailInformation[0]["toEmails"][0]["user"] == "aidan.perez"
    assert emailInformation[0]["toEmails"][0]["address"] == "aidan.perez@gordon.edu"
    assert emailInformation[1]["toEmails"][0]["user"] == "jacob.christopher"
    assert emailInformation[1]["toEmails"][0]["address"] == "jacob.christopher@gordon.edu"
    assert emailInformation[2]["toEmails"][0]["user"] == "josiah.kangas"
    assert emailInformation[2]["toEmails"][0]["address"] == "josiah.kangas@gordon.edu"
    assert emailInformation[3]["toEmails"][0]["user"] == "hudson.finn"
    assert emailInformation[3]["toEmails"][0]["address"] == "hudson.finn@gordon.edu"
