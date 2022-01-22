export function setEventFilters(events: any, sportFilter: any, opponentFilter: any, dateFilter: any)
{
    console.log(dateFilter)
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
        events = events.sort(function(a: any, b: any) {
            var c = new Date(a.eventDate);
            var d = new Date(b.eventDate);
            if(dateFilter=="newest"){
                return c > d ? 1 : -1;
            }else{
                return c < d ? 1 : -1;
            }
        });
    }
    console.log(events);
    return events;
}

export function getSportList(events: any)
{
    let unique = new Set(events?.map((item: { sport: string; }) => item.sport));
    return unique;
}

export function getOpponentList(events: any)
{
    let unique = new Set(events?.map((item: { opponent: string; }) => item.opponent));
    return unique;
}