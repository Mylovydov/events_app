import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowRightFromBracket,
	faBell,
	faCalendarDays,
	faCaretDown,
	faCaretUp,
	faChevronLeft,
	faChevronRight,
	faFaceSadTear,
	faFileCsv,
	faGear,
	faHouse,
	faRectangleList,
	faSpinner,
	faUser
} from '@fortawesome/free-solid-svg-icons';

const fontAwesome = {
	init: () =>
		library.add(
			faUser,
			faBell,
			faCalendarDays,
			faRectangleList,
			faGear,
			faArrowRightFromBracket,
			faHouse,
			faFileCsv,
			faCaretUp,
			faCaretDown,
			faFaceSadTear,
			faSpinner,
			faChevronRight,
			faChevronLeft
		)
};

export default fontAwesome;
