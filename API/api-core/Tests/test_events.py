import pytest_components

def test_getAllEvents():
    # data = constructEventData('M Rowing', 'Head of the Aardvark', 'Away', 
    #     'Mobile, AL', '01-01-2022 3:00 PM', '12-31-2021 12:00 PM', False, 
    #     '01-02-2022 8:00 PM', 'Unit Test', True)
    # addResponse = pytest_components.post("/Events/add", data)
    # assert addResponse.status_code == 200
    allEventsResponse = pytest_components.get("/Events")
    assert allEventsResponse.status_code == 200
    allEventsResponse_body = allEventsResponse.json()
    assert len(allEventsResponse_body) > 0
    # assert allEventsResponse_body[len(allEventsResponse_body) - 1]["sport"] == "M Rowing"
    

def constructEventData(sport, opponent, homeOrAway, destination,  
    eventDate, departureTime, isDeleted, arrivalTime, comments, isScrimmage):
    return {
        'sport': sport,
        'opponent': opponent,
        'homeOrAway': homeOrAway,
        'destination': destination,
        'eventDate': eventDate,
        'departureTime': departureTime,
        'isDeleted': isDeleted,
        'arrivalTime': arrivalTime,
        'comments': comments,
        'isScrimmage': isScrimmage
    }