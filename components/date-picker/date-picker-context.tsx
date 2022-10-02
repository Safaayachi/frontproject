import React from "react";

export const datePickerContextDefaultValue: {
	focusedDate: Date | null;
	isDateFocused: (date: Date) => boolean;
	isDateSelected: (date: Date) => boolean;
	isDateHovered: (date: Date) => boolean;
	isDateBlocked: (date: Date) => boolean;
	isStartDate: (date: Date) => boolean;
	isEndDate: (date: Date) => boolean;
	isFirstOrLastSelectedDate: (date: Date) => boolean;
	onDateFocus: (date: Date) => void;
	onDateHover: (date: Date) => void;
	onDateSelect: (date: Date) => void;
	goToNextMonthsByOneMonth: () => void;
	goToPreviousMonthsByOneMonth: () => void;
} = {
	focusedDate: null,
	isDateFocused: () => false,
	isDateSelected: () => false,
	isDateHovered: () => false,
	isDateBlocked: () => false,
	isStartDate: () => false,
	isEndDate: () => false,
	isFirstOrLastSelectedDate: () => false,
	onDateFocus: () => {},
	onDateHover: () => {},
	onDateSelect: () => {},
	goToNextMonthsByOneMonth: () => {},
	goToPreviousMonthsByOneMonth: () => {},
};

export default React.createContext(datePickerContextDefaultValue);
