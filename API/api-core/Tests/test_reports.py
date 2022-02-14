import pytest_components

def test_getReport():
    response = pytest_components.get("/Reports")
    assert response.status_code == 200
    report = response.content
    report = report.decode()
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