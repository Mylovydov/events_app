import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faArrowRightFromBracket,
	faBell,
	faCalendarDays,
	faCaretDown,
	faCaretUp,
	faChevronLeft,
	faChevronRight,
	faCircleCheck,
	faCircleXmark,
	faEye,
	faEyeSlash,
	faFaceSadTear,
	faFileCsv,
	faGear,
	faHouse,
	faRectangleList,
	faSpinner,
	faStarOfLife,
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
			faStarOfLife,
			faChevronLeft,
			faCircleXmark,
			faCircleCheck,
			faEyeSlash,
			faEye
		)
};

export default fontAwesome;
