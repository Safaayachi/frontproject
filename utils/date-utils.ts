export function getNumericDay(
	dateStr: string | number | Date,
	locale: Intl.LocalesArgument,
	options: Intl.DateTimeFormatOptions = { day: "numeric" }
) {
	const date = new Date(dateStr);
	return date.toLocaleDateString(locale, options);
}
export function getDayName(
	dateStr: string | number | Date,
	locale: Intl.LocalesArgument,
	options: Intl.DateTimeFormatOptions = { weekday: "long" }
) {
	const date = new Date(dateStr);
	return date.toLocaleDateString(locale, options);
}
export function getMonthName(
	dateStr: string | number | Date,
	locale: Intl.LocalesArgument,
	options: Intl.DateTimeFormatOptions = { month: "long" }
) {
	const date = new Date(dateStr);
	return date.toLocaleDateString(locale, options);
}
