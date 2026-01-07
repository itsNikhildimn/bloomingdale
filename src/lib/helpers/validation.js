//---------------------------------------------------------------------------
// Module: Validation
//
// Checks that a valid entry has been submitted and outputs succes or failure
// messages. The latter with instructions to complete form
//
// In addition, if valid, works out what the age of the child will be at the
// beginning of term, this year if the school year has yet to come, or next
// year if it has already passed. Based on this, the appropriate entrolment
// yeargroup is defined.
//---------------------------------------------------------------------------

import { differenceInYears, setMonth, parse, isAfter, addYears } from 'date-fns';

export default function validation(day, month, year) {
	if (isValidDay(day) && isValidMonth(month) && isValidYear(year)) {
		// Valid entry
		const { termStart, ageOfChild } = childsAgeAtStartOfTerm(month, year, day);
		const yearGroup = getYearGroup(ageOfChild);

		return { isValid: true, yearGroup };
	} else {
		let message = '';
		if (!isValidDay(day) && !isValidMonth(month) && !isValidYear(year)) {
			message = 'Please select a Day, Month and Year';
		} else if (isValidMonth(month) && isValidYear(year)) {
			message = 'Please select a Day';
		} else if (isValidDay(day) && isValidYear(year)) {
			message = 'Please select a Month';
		} else if (isValidDay(day) && isValidMonth(month)) {
			message = 'Please select a Year';
		} else if (isValidDay(day)) {
			message = 'Please select a Month and a Year';
		} else if (isValidMonth(month)) {
			message = 'Please select a Day and a Year';
		} else if (isValidYear(year)) {
			message = 'Please select a Month and a Day';
		}
		return { isValid: false, feedback: message };
	}
}

export function isValidDay(value) {
	return /^([1-9]|[12]\d|3[01])$/.test(value);
}

export function isValidMonth(monthName) {
	const regex =
		/^(January|February|March|April|May|June|July|August|September|October|November|December)$/i;
	return regex.test(monthName);
}

export function isValidYear(year) {
	const regex = /^(19|20)\d{2}$/;
	return regex.test(year);
}

function childsAgeAtStartOfTerm(month, year, day) {
	const date = parse(month, 'MMMM', new Date());

	// Create the input date
	const inputDate = new Date(+year, date.getMonth(), day);

	// Get the current date
	const currentDate = new Date();

	// Set the month and day to June 30th of the current year
	const currentYearJune30 = setMonth(currentDate, 5); // Note: Months are zero-based, so June is 5
	currentYearJune30.setDate(30);

	// Check if the current date is after June 30th of the current year
	if (isAfter(currentDate, currentYearJune30)) {
		// If current date is after June 30th, get the next June 30th
		const nextYearJune30 = setMonth(addYears(currentDate, 1), 5); // Note: Months are zero-based, so June is 5
		nextYearJune30.setDate(30);

		const ageOfChild = differenceInYears(nextYearJune30, inputDate);
		return { termStart: nextYearJune30, ageOfChild };
		// Enrolment for this year has passed, you're child will be age x next year and will be eligible to start our y program
	} else {
		// If current date is on or before June 30th, get the current June 30th
		const ageOfChild = differenceInYears(currentYearJune30, inputDate);
		return { termStart: currentYearJune30, ageOfChild };
	}
}

// Year groups
function getYearGroup(age) {
	if (age === 3) return 'Nursery';
	if (age === 4) return 'EY1';
	if (age === 5) return 'EY2';
	if (age === 6) return 'PY1';
	if (age === 7) return 'PY2';
	if (age === 8) return 'PY3';
	if (age === 9) return 'PY4';
	if (age === 10) return 'PY5';
	if (age === 11) return 'MY1';
	if (age === 12) return 'MY2';
	if (age === 13) return 'MY3';
	if (age === 14) return 'MY4';
	if (age === 15) return 'MY5 (No new admissions for MY5)';
	if (age >= 16) return 'DP';
}
