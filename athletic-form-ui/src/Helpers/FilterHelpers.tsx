export function setEventFilters(events: any, filters: any)
{
    console.log(filters);
    if(filters[0].sport != null){
        events = events.filter(function (e: { [x: string]: any }) {
            return e["sport"] == filters[0].sport
        });
    }
    console.log(events);
    return events;
}