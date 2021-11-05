/* Represents an event. To be moved to the API when we are able */
export class Event {
	sport: string;
	opponent: string;
	date: string;
	time: string;
	departOrHome: string;
	destination: string;

	constructor(sport: string, opponent: string, date: string, time: string, 
			departOrHome: string, destination: string) {
		this.sport = sport;
		this.opponent = opponent;
		this.date = date;
		this.time = time;
		this.departOrHome = departOrHome;
		this.destination = destination;
	}
}
