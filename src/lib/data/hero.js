import academicsClassroom from '$lib/images/academics-classroom.webp';
import academicsClassroomMobile from '$lib/images/academics-classroom-c.webp';

import childrenSteps from '$lib/images/children-steps.webp';
import girlHurdle from '$lib/images/girl-hurdle.webp';

import boysCraftWithTeacher from '$lib/images/myp/boys-craft-with-teacher.webp';
import boysCraftWithTeacherMobile from '$lib/images/myp/boys-craft-with-teacher.webp';

import diploma from '$lib/images/heroes/hero-diploma.webp';
import diplomaMobile from '$lib/images/heroes/hero-diploma-c.webp';

import cbse from '$lib/images/heroes/hero-cbse.webp';
import cbseMobile from '$lib/images/heroes/hero-cbse-c.webp';

import earlyYears from '$lib/images/heroes/hero-early-years.webp';
import earlyYearsMobile from '$lib/images/heroes/hero-early-years-c.webp';

import primaryYears from '$lib/images/heroes/hero-primary-years.webp';
import primaryYearsMobile from '$lib/images/heroes/hero-primary-years-c.webp';

import middleYears from '$lib/images/heroes/hero-middle-years.webp';
import middleYearsMobile from '$lib/images/heroes/hero-middle-years-c.webp';

import girlWithFootball from '$lib/images/sports/girl-with-football.webp';
import girlWithFootballMobile from '$lib/images/sports/girl-with-football-c.webp';

import counselling from '$lib/images/counselling/counselling.webp';
import counsellingMobile from '$lib/images/counselling/counselling-c.webp';

import transport from '$lib/images/yellow-busses.webp';
import transportMobile from '$lib/images/yellow-busses-c.webp';

export const aboutHero = {
	title: ['Our vision ', 'has meaning'],
	desc: 'Empower everyone to become a thriving lifelong learner and responsible global citizen.',
	src: childrenSteps,
	alt: ''
};

export const earlyYearsHero = {
	btn: true,
	title: ['Early Years', 'Programme (EYP)'],
	desc: 'At Bloomingdale International School, every detail is designed to ensure each child is happy, involved and learning',
	src: earlyYears,
	alt: '',
	srcset: earlyYearsMobile,
	btnText: 'Early Years showreel'
};

export const primaryYearsHero = {
	title: ['Primary Years', 'Programme (PYP)'],
	desc: 'The IB Primary Years Programme (PYP) for children aged 3 — 12 nurtures and develops young students as caring, active participants in a lifelong journey of learning',
	src: primaryYears,
	alt: '',
	srcset: primaryYearsMobile
};

export const middleYearsHero = {
	title: ['Middle Years Programme (MYP)'],
	desc: 'Bloomingdale International School is an International Baccalaureate (IB) World School offering the Primary Years Programme (PYP) and Middle Years Programme (MYP)',
	src: middleYears,
	alt: '',
	srcset: middleYearsMobile
};

export const cbseHero = {
	title: ['Central Board of Secondary Education', '(CBSE)'],
	desc: 'Bloomingdale International School is an accredited school of the Central Board of Secondary Education (CBSE), New Delhi, India.',
	src: cbse,
	alt: '',
	srcset: cbseMobile
};

export const diplomaHero = {
	title: ['Diploma Programme', '(DP)'],
	desc: 'Grades 11 and 12 at Bloomingdale follow the most challenging and comprehensive curriculum - the international baccalaureate diploma programme (IBDP). The IB diploma is globally recognized as a highly valued university entry qualification.',
	src: diploma,
	alt: '',
	srcset: diplomaMobile
};

export const academicsHero = {
	title: ['Our vision', 'has meaning'],
	desc: 'Empower everyone to become a thriving lifelong learner and responsible global citizen.',
	src: academicsClassroom,
	alt: '',
	srcset: academicsClassroomMobile
};

export const afterSchoolHero = {
	title: ['After school'],
	desc: "Bloomingdale's After school program is a partnership with the Ombrello academy. The goal of the program is to provide enrichment activities that supplement the education experience at BIS",
	src: girlWithFootball,
	alt: '',
	srcset: girlWithFootballMobile
};

export const sportsHero = {
	title: ['Sports'],
	desc: 'There are a variety of clubs for students to join throughout the year. Starting from Grade 1 children get to pick sports of their choice.',
	src: girlHurdle,
	alt: ''
};

export const artHero = {
	title: ['Art'],
	desc: 'There are a variety of clubs for students to join throughout the year. Starting from Grade 1 children get to pick art of their choice.',
	src: boysCraftWithTeacher,
	alt: '',
	srcset: boysCraftWithTeacherMobile
};

export const counselingHero = {
	title: ['Counselling'],
	desc: 'Bloomingdale International School strongly believes college counselling is not about ranking or social status but it is about finding the best fit college for the student. This journey for the student should be a “process and not a product”.',
	src: counselling,
	alt: 'Faculty members holding counselling certificate',
	srcset: counsellingMobile
};

export const transportHero = {
	title: ['Transport'],
	desc: 'All our busses are equipped with AC, built-in GPS and safety equipment. We hire an experienced team to ensure students safety.',
	src: transport,
	alt: '',
	srcset: transportMobile
};
