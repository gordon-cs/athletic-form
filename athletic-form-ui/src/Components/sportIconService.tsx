import { 
	MdSportsBaseball, 
	MdSportsBasketball,
	MdDirectionsRun,
	MdSportsHockey,
	MdSportsGolf,
	MdRowing,
	MdSportsSoccer,
	MdSportsTennis,
	MdSportsVolleyball
} from 'react-icons/md';
import { FaSwimmer } from 'react-icons/fa';
import { GiLion } from 'react-icons/gi';

export const setSportIcon = (sportIcon: any, eventData?: any) => {
    const iconSize = 45
	switch (eventData?.sport) {
		case "M Baseball":
		case "W Softball":
			sportIcon = (
				<MdSportsBaseball size={iconSize} />
			);
			break;
		case "M Basketball":
		case "W Basketball":
			sportIcon = (
				<MdSportsBasketball size={iconSize} />
			);
			break;
		case "M Cross Country":
		case "W Cross Country":
		case "M Track & Field":
		case "W Track & Field":
			sportIcon = (
				<MdDirectionsRun size={iconSize} />
			);
			break;
		case "W Field Hockey":
			sportIcon = (
				<MdSportsHockey size={iconSize} />
			);
			break;
		case "M Golf":
			sportIcon = (
				<MdSportsGolf size={iconSize} />
			);
			break;
		case "M Rowing":
		case "W Rowing":
			sportIcon = (
				<MdRowing size={iconSize} />
			);
			break;
		case "M Soccer":
		case "W Soccer":
			sportIcon = (
				<MdSportsSoccer size={iconSize} />
			);
			break;
		case "M Swimming":
		case "W Swimming":
			sportIcon = (
				<FaSwimmer size={iconSize} />
			);
			break;
		case "M Tennis":
		case "W Tennis":
			sportIcon = (
				<MdSportsTennis size={iconSize} />
			);
			break;
		case "W Volleyball":
			sportIcon = (
				<MdSportsVolleyball size={iconSize} />
			);
			break;
		default: 
			sportIcon = (
				<GiLion size={iconSize} />
			);
			break;
	}

}
