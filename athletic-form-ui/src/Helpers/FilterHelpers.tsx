export function setEventFilters(events: any, sportFilter: any, opponentFilter: any, dateFilter: any)
{
    console.log(sportFilter)
    if(sportFilter != null && sportFilter != ""){
        events = events.filter(function (e: { [x: string]: any }) {
            return e["sport"].toLowerCase() == sportFilter.toLowerCase()
        });
    }
    if(opponentFilter != null && opponentFilter != ""){
        events = events.filter(function (e: { [x: string]: any }) {
            return e["opponent"].toLowerCase() == opponentFilter.toLowerCase()
        });
    }
    if(dateFilter != null){
        events = events.filter(function (e: { [x: string]: any }) {
            return e["eventDate"] == dateFilter.value
        });
    }
    console.log(events);
    return events;
}