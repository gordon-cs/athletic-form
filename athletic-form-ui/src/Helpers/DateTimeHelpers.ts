export function getDateTimeAsJs(dateTime: any) {
	let dateAsJs = null;
	if (dateTime != null) {
		let parsedDate = new Date(Date.parse(dateTime));
		let time = convertTime(parsedDate.getHours(), parsedDate.getUTCMinutes());
		let date = getDateAsJs(dateTime);
		dateAsJs = date + ' ' + time;
	}
	return dateAsJs;
}

export function getTimeAsJs(dateTime: any) {
	let time = null;
	if (dateTime != null) {
		let parsedDate = new Date(Date.parse(dateTime));
		time = convertTime(parsedDate.getHours(), parsedDate.getUTCMinutes());
	}	
	return time;
}

export function getDateAsJs(date: any) {
	let dateAsJs = null;
	if (date !== null) {
		let parsedDate = new Date(Date.parse(date));
		dateAsJs =
			parsedDate.getMonth() + 1 + '/' + parsedDate.getDate() + '/' + parsedDate.getFullYear();
	}
	return dateAsJs;
}

//Returns dateTime as an int to compare if a dateTime is before or after another one
//Not numerically accurate, but accurate relative to other returns, as it assumes each month is 31 days
export function getDateTimeAsInt(dateTime: any) {
	let iTime = 0;
	if (dateTime != null) {
		let parsedDate = new Date(Date.parse(dateTime));
		iTime += (parsedDate.getFullYear() - 2000) * 372; //(31 * 12)
		iTime += parsedDate.getMonth() * 31;
		iTime += parsedDate.getDay();
	}	
	return iTime;
}

function convertTime(hour: number, minute: number) {
	let timeAsJs = '';
	let hour12 = hour % 12;
	if (hour12 === 0) {
		hour12 = 12;
	}
	let ending = '';
	if (hour >= 12) {
		ending = ' PM';
	} else {
		ending = ' AM';
	}
	timeAsJs = hour12 + ':';
	if (minute < 10) {
		timeAsJs += '0';
	}
	timeAsJs += minute + ending;
	return timeAsJs;
}
