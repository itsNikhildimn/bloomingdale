import nodemailer from 'nodemailer';
import { smtpTransport } from '$lib/config/mail-config';
import { RECAPTCHA_SERVER_SECRET } from '$env/static/private';
import { academicYears, branches, classLists } from './options.js';

const admissionsMailbox = 'support@bloomingdale.edu.in';

const altAddress = [
  'Harikrishna Garu <harikrishna@nalanda.edu.in>',
  'Swetha <swethak@bloomingdale.edu.in>'
];

function translate(list, id) {
  const entry = list?.find(e => e[0] === id);
  return entry ? entry[1] : '<unknown>'
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request}) => {
    // Extract and validate form data ...
    const data = await request.formData();
    const name = data.get('parent').trim(),
          email = data.get('email'),
          tel = data.get('contact').trim(),
          student = data.get('student').trim(),
          dob = data.get('dob').trim(),
          yearId = data.get('year').trim(),
          branchId = data.get('branch').trim(),
          classId = data.get('class').trim()

    if (name === '') {
      return { ok: false, reason: 'Name must not be blank' }
    }
    if (! validateEmail(email)) {
      return { ok: false, reason: 'Invalid email address' }
    }

    // Translate year, branch and class to long text form.
    const program = translate(academicYears, yearId),
          branch = translate(branches, branchId),
          className = translate(classLists[branchId], classId);

    // Validate reCAPTCHA token ...
    const params = new FormData();
    params.set('secret', RECAPTCHA_SERVER_SECRET);
    params.set('response', data.get('token'));
    const recaptcha = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'post',
        body:   params
      }
    ).then(rsp => rsp.json());
    if (! recaptcha.success || recaptcha.action !== 'enquiry' || ! recaptcha.score > 0.8) {
      return { ok: false, reason: 'Robot submission' }
    }

    // All good. Send the contact form email ...
    try {
      const messageText =
`Enquiry
  
From: ${name} <${email}>
Tel:  ${tel}

Student:  ${student}
DoB:      ${dob}
Program:  ${program}
Class:    ${className}
Branch:   ${branch}
`;
      const transport = nodemailer.createTransport(smtpTransport);
      await transport.sendMail({
        from: smtpTransport.auth.user,
        to:   admissionsMailbox,
        bcc:  altAddress,
        subject: "Enquiry",
        text: messageText
      });

      return { ok: true }
    }
    catch (err) {
      return { ok: false, reason: err.message }
    }
  }
}

function validateEmail(addr) {
  return /^[\w\-.]+@[\w\-.]+$/i.test(addr);
}