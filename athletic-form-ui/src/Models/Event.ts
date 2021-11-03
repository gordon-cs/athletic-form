export class Event {
	sport: string;
	opponent: string;
	date: string;
	time: string;
	departOrHome: string;

	constructor(sport: string, opponent: string, date: string, time: string, departOrHome: string) {
		this.sport = sport;
		this.opponent = opponent;
		this.date = date;
		this.time = time;
		this.departOrHome = departOrHome;
	}
}
