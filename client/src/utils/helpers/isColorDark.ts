const isColorDark = (color?: string) => {
	if (!color) {
		return false;
	}

	color = color.replace('#', '');

	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);

	const brightness = (299 * r + 587 * g + 114 * b) / 1000;
	return brightness < 128;
};

export default isColorDark;
