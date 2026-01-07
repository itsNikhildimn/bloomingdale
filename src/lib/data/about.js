// The objects exported from this file are consumed by the follow VisText components:
// VisText: consumes a text property that passes an array of "paragraphs"
// VisTextB: consumes a text property that passes objects with a title and an array of paragraps
// VisTextC consumes a text property that passes html

import principle from '$lib/images/faculty/principle.webp';
import history from '$lib/images/campus/bis-facade-south.webp';
import eypKids from '$lib/images/cropped/eyp-kids.webp';
import chairman from '$lib/images/chairman.webp';
import circleTime from '$lib/images/counselling/circle-time.webp';
import childrenSteps from '$lib/images/cropped/children-steps-cropped.webp';

import mypStudents from '$lib/images/myp/students-line.webp';
import blueTick from '$lib/icons/blue-tick.svg';

export const principalsMessage = {
	src: principle,
	alt: '',
	title: 'Principal’s message',
	text: [
		'BIS was started as a dream – a dream envisioned by our Founder Members. BIS is a small school with a large vision. Education at BIS goes beyond the letters in the page of a textbook, and students emerge as confident young individuals, ready to face the challenges of the 21st century. We inspire our students to question and learn by doing, we give them the skills, courage, optimism and integrity to pursue their own dreams. In doing so, our students develop into confident, creative and caring adults who pursue interesting and challenging careers.',
		'Learning takes many forms at BIS. Each student achieves his or her own potential in the classroom, art room, sports field or on the stage. Being a small school, there are several opportunities for each individual to explore and hone their unique talents. We encourage all our students to persevere, participate and take responsibility for their own development. Through the years at BIS our students are happy to come to school, as each day is an adventure, with something new and exciting to engage them.',
		'BIS believes there is no contradiction between learning and fun, joy and the pursuit of excellence, the global and the local, and between respecting tradition and embracing change.'
	]
};

export const ourHistory = {
	src: history,
	alt: '',
	title: 'Our History',
	text: [
		'Bloomingdale International School was founded in 2006 as Bloomingdale playschool. With the growing need for alternative education practices in the city, Bloomingdale then took up the mighty responsibility to make children today fall in love with learning and equip them to be life-long learners with the foundation of the international curriculum and global mindset – thus giving rise to Bloomingdale International School in 2016.'
	]
};

export const chairmansMessage = {
	src: chairman,
	alt: 'Chairman Viyaya Babu Atluri',
	title: "Chairman's Message",
	text: [
		'It has been an exciting and fulfilling journey to be able to steer the quality of life in Vijayawada by educating generations here. It is disturbing to know of families parting with their little ones and sending them to Boarding Schools to provide International standard education.'
	],
	chairman: {
		name: 'Vijaya Babu Atluri',
		role: 'Chairman'
	}
};

export const cbseAbout = {
	src: childrenSteps,
	alt: '',
	title: 'Central Board of Secondary Education (CBSE)',
	text: [
		{
			title: 'Curriculum',
			text: [
				'The curriculum is structured to promote critical thinking, creativity, and problem-solving skills among students. It also emphasizes the importance of physical education, arts, and extracurricular activities in the overall development of a child.'
			]
		},
		{
			title: 'Design Thinking Approach',
			text: [
				'Teaching encourages students to view challenges as opportunities, transforming curiosity into practical solutions. This makes every day an practical and engaging learning experience.'
			]
		},
		{
			title: 'Project-based Learning',
			text: [
				'Emphasizing "learning by doing," students actively participate in projects that bring lessons to life. These hands-on activities ensure that concepts are relevant and connected to real-world scenarios, making learning both meaningful and impactful'
			]
		},
		{
			title: 'Interdisciplinary Learning',
			text: [
				'Education at BIS goes beyond subject boundaries, connecting ideas across different fields. Interdisciplinary projects allow students to gain fresh perspectives, think holistically, and develop a deeper understanding of complex concepts.'
			]
		},
		{
			title: 'American Curriculum-Based Assessments',
			text: [
				"We provide parents and students with tools offering clear, comprehensive insights into each child's growth. This method helps our students understand their strengths and areas for improvement, fostering progress every step of their way."
			]
		}
	]
};

export const diplomaAbout = {
	src: childrenSteps,
	alt: '',
	title: 'Why the Diploma Programme?',
	text: [
		'Students take written examinations at the end of the DP, which are marked by external IB examiners. Students also complete assessment tasks in the school, which are either initially marked by teachers and then moderated by external moderators or sent directly to external examiners.',
		'The marks awarded for each course range from 1 (lowest) to 7 (highest). Students can also be awarded up to three additional points for their combined results on Theory of Knowledge and the Extended Essay. The Diploma is awarded to students who gain at least 24 points, subject to certain minimum levels of performance across the whole programme and to satisfactory participation in the Creativity, Action, Service requirement. The highest total that a DP student can be awarded is 45 points.'
	]
};

// VisTextB
export const earlyYearsAbout = {
	src: eypKids,
	alt: '',
	title: 'Inquiry Learning: Learning Through Discovery',
	text: [
		{
			title: 'Broad and Balanced',
			text: [
				'An IB education represents a balanced approach, offering students access to a broad range of content that spans academic subjects.',
				'In the PYP, learning aims to transcend boundaries between subject areas. As students develop in the MYP and DP, they engage subject-specific knowledge and skills with increasing sophistication.'
			]
		},
		{
			title: 'Conceptual',
			text: [
				'Conceptual learning focuses on broad and powerful organizing ideas that are relevant within and across subject areas. It reaches beyond national and cultural boundaries. It helps integrate learning, add coherence to the curriculum, deepen disciplinary understanding, builds the capacity to engage with complex ideas, and allows transfer of learning to new contexts. PYP and MYP students learn the key concepts, and students in the DP further develop their conceptual understanding.'
			]
		},
		{
			title: 'Connected',
			text: [
				'IB curriculum frameworks value concurrency of learning. Students encounter many subjects simultaneously throughout their programmes of study; they learn to draw connections and pursue rich understandings about the interrelationship of knowledge and experience across many fields. Course aims and programme requirements offer authentic opportunities to learn about the world in ways that reach beyond the scope of individual subjects.'
			]
		}
	]
};

export const counselingAbout = {
	src: circleTime,
	alt: '',
	title: 'Circle Time',
	text: [
		{
			title: 'In-House College Counselling Cell',
			text: [
				'The career counselling cell serves as an enlightening resource for students, enabling them to delve deeper into the realm of universities. We have recently inaugurated our in-house career counselling and guidance cell, equipped with an extensive collection of university brochures and pennants. Students will have the invaluable opportunity to peruse these materials and engage in interactive discussions with our knowledgeable college counsellor.'
			]
		},
		{
			title: 'PSAT Centre',
			text: [
				'Bloomingdale is the authorized center for administering the PSAT exams. Annually, we facilitate the administration of the PSAT 8/9, PSAT 10, and PSAT NMSQT for students in grades 8 to 10. We warmly welcome students from other schools to partake in these examinations as well. For those interested in registering, please do not hesitate to reach out to our college guidance counsellor at sabastin@bloomingdale.edu.in.'
			]
		}
	]
};

// VisTextC
export const middleYearsAbout = {
	src: mypStudents,
	alt: '',
	title: 'IB Middle Years',
	text: `
	<p class="lg-body-text">Research shows that students participating in the IB Middle Years Programme:</p>
	<br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Build confidence in managing their own learning.</p><br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Learn by doing, connecting the classroom to the larger world.</p><br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Outperform non-IB students in critical academic skills.</p><br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Consistently have greater success in IB Diploma Programme examinations.</p><br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Thrive in positive school cultures where they are engaged and motivated to excel.</p><br />
		<p class="lg-body-text" style="display: flex"><span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>Develop an understanding of global challenges and a commitment to act as responsible citizens.</p><br />
	<br />
	<p class="lg-body-text">The MYP was revised in September 2014 to provide a more rigorous and highly flexible framework that powerfully integrates with local educational requirements.</p>
	<br />
	<p class="lg-body-text">To find out more about the MYP, please visit <a href="www.ibo.org/myp">www.ibo.org/myp</a></p>
	`
};

export const middleYearsExternalAssessment = {
	src: childrenSteps,
	alt: '',
	title: 'External Assessment (eAssessment)',
	text: `
	<p class="lg-body-text">The Middle Years Programme (MYP) is a framework for teaching and learning, organized around teachers’ judgment of achievement against pre-published criteria. Formal recognition of achievement for MYP year 5 students is provided by the IB via eAssessment.</p>
	<br />
	<p class="lg-body-text">eAssessment consists of three component types that assess what students know and are able to do:</p>
	<br />
	<p class="lg-body-text" style="display: flex">
		<span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>
		<span>
			<span style="font-weight: 500">ePortfolios</span> 
			of carefully defined coursework in arts, design and physical and health education, using a process of dynamic sampling to moderate results to a global standard.
		</span>
	</p>
	<br />
	<p class="lg-body-text" style="display: flex">
		<span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>
		<span>
			<span style="font-weight: 500">On-screen examinations</span>
			(two hours in duration) for selected courses in language and literature, language acquisition, individuals and societies, sciences, mathematics, and interdisciplinary learning
		</span>	
	</p>
	<br />
	<p class="lg-body-text" style="display: flex">
		<span style="margin-right: 0.5em; margin-top: 0.2em"><img src="${blueTick}" alt='tick'/></span>
		<span>
			<span style="font-weight: 500">Personal Project</span>; 
			a student-centred and age-appropriate extended project in which students consolidate their learning throughout the programme. Submitting the Personal Project is a requirement of all students in the MYP.
		</span>		
	</p>
	<br />
	<br />
	`
};
