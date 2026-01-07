// Assets for news
import boyPaintOnHands from '$lib/images/cropped/boy-paint-on-hands-cropped.webp';
import girlHurdle from '$lib/images/cropped/girl-hurdle-cropped.webp';
import childrenClass from '$lib/images/cropped/children-class-cropped.webp';
import boyRobot from '$lib/images/cropped/boy-robot-cropped.webp';
import childrenSteps from '$lib/images/cropped/children-steps-cropped.webp';

// Assets for teachers

export const newsItems = {
	title: ['News @Bis'],
	cta: true,
	readAllBtn: true,
	entries: [
		{
			image: girlHurdle,
			alt: 'Sports day',
			title: '5th Annual Sports Meet'
		},
		{
			image: boyPaintOnHands,
			alt: 'Sports day',
			title: '5th Annual Sports Meet'
		},
		{
			image: childrenClass,
			alt: 'Sports day',
			title: '5th Annual Sports Meet'
		},
		{
			image: boyRobot,
			alt: 'Sports day',
			title: '5th Annual Sports Meet'
		},
		{
			image: childrenSteps,
			alt: 'Sports day',
			title: '5th Annual Sports Meet'
		}
	]
};

/* Now fetched from Strapi...
export const teachers = {
	title: ['Awesome teachers', 'with great knowledge'],
	entries: [
		{
			image: teacher1,
			alt: '',
			title: 'Bruce Wayne',
			subject: 'Math teacher',
			about: {
				exp: '8 Years of experience',
				desc: 'Experienced math teacher passionate about inspiring critical thinking and problem-solving. Adaptable to diverse learners and creates supportive classrooms.'
			}
		},
		{
			image: teacher2,
			alt: '',
			title: 'Bruce Wayne',
			subject: 'Math teacher',
			about: {
				exp: '8 Years of experience',
				desc: 'Experienced math teacher passionate about inspiring critical thinking and problem-solving. Adaptable to diverse learners and creates supportive classrooms.'
			}
		},
		{
			image: teacher3,
			alt: '',
			title: 'Bruce Wayne',
			subject: 'Math teacher',
			about: {
				exp: '8 Years of experience',
				desc: 'Experienced math teacher passionate about inspiring critical thinking and problem-solving. Adaptable to diverse learners and creates supportive classrooms.'
			}
		},
		{
			image: teacher1,
			alt: '',
			title: 'Bruce Wayne',
			subject: 'Math teacher',
			about: {
				exp: '8 Years of experience',
				desc: 'Experienced math teacher passionate about inspiring critical thinking and problem-solving. Adaptable to diverse learners and creates supportive classrooms.'
			}
		}
	]
};
*/
