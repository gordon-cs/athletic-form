export function getDateTimeAsJs(dateTime: any) {
    let dateAsJs = null;
    if (dateTime != null) {
        let parsedDate = new Date(Date.parse(dateTime));
        let time = convertTime(parsedDate.getHours(), parsedDate.getUTCMinutes());
        let date = getDateAsJs(dateTime);
        dateAsJs = date + " " + time;
    }
    return dateAsJs;
}

function getDateAsJs(date: any) {
    let dateAsJs = null;
    if (date !== null) {
        let parsedDate = new Date(Date.parse(date));
        dateAsJs = (parsedDate.getMonth() + 1) + "/" + parsedDate.getDate() + "/"
            + parsedDate.getFullYear();
    }
    return dateAsJs;
}

function convertTime(hour: number, minute: number) {
    let timeAsJs = "";
    let hour12 = hour % 12;
    if (hour12 === 0) {
        hour12 = 12;
    }
    let ending = "";
    if (hour >= 12) {
        ending = " PM"
    } else {
        ending = " AM"
    }
    timeAsJs = hour12 + ":"
    if (minute < 10) {
        timeAsJs += "0";
    }
    timeAsJs += minute + ending;
    return timeAsJs
}