import earlyYears from '$lib/images/children-early-years.webp';
import rocket from '$lib/images/children-rocket.webp';
import boyRobot from '$lib/images/boy-robot.webp';
import childrenSteps from '$lib/images/children-steps.webp';
import cbse from '$lib/images/cbse/icbse.webp';

export const programmes = [
	{
		title: 'Early Years',
		link: '/eyp',
		color: 'orange',
		image: earlyYears,
		alt: 'Children playing',
		text: `The program is designed to provide a comprehensive approach to support the growth and
      development of young children, focusing on their physical, emotional well-being.`
	},
	{
		title: 'Primary Years',
		link: '/pyp',
		color: 'lime',
		image: boyRobot,
		alt: 'Boy building robot',
		text: `The program is designed to provide a comprehensive approach to support the growth and
      development of young children, focusing on their physical, emotional well-being.`
	},
	{
		title: 'Middle Years',
		link: '/myp',
		color: 'purple',
		image: rocket,
		alt: 'Pupils building rocket',
		text: `The program is designed to provide a comprehensive approach to support the growth and
      development of young children, focusing on their physical, emotional well-being.`
	},
	{
		title: 'CBSE',
		link: '/cbse',
		color: 'red',
		image: cbse,
		alt: 'Pupils in campus grounds',
		text: `The Central Board of Secondary Education (CBSE) is a national-level board of education for public and private schools, controlled and managed by the Government of India.`
	},
	{
		title: 'Diploma',
		link: '/diploma',
		color: 'blue',
		image: childrenSteps,
		alt: 'Pupils in campus grounds',
		text: `The program is designed to provide a comprehensive approach to support the growth and
      development of young children, focusing on their physical, emotional well-being.`
	}
];
