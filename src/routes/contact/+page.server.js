import nodemailer from 'nodemailer';
import { smtpTransport } from '$lib/config/mail-config';
import { RECAPTCHA_SERVER_SECRET } from '$env/static/private';

const contactMailbox = 'support@bloomingdale.edu.in';

const altMailbox = [
  'Harikrishna Garu <harikrishna@nalanda.edu.in>',
  'Swetha <swethak@bloomingdale.edu.in>'
];

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({request}) => {
    // Extract and validate form data ...
    const data = await request.formData();
    const name = data.get('name').trim(),
          email = data.get('email').trim(),
          message = data.get('message').trim()
    if (name === '') {
      return { ok: false, reason: 'Name must not be blank' }
    }
    if (! validateEmail(email)) {
      return { ok: false, reason: 'Invalid email address' }
    }

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
    if (! recaptcha.success || recaptcha.action !== 'contact' || ! recaptcha.score > 0.8) {
      return { ok: false, reason: 'Robot submission' }
    }

    // All good. Send the contact form email ...
    try {
      const messageText =
`Contact request
  
From: ${name} <${email}>

${message}
`;
      const transport = nodemailer.createTransport(smtpTransport);
      await transport.sendMail({
        from: smtpTransport.auth.user,
        to:   contactMailbox,
        bcc:  altMailbox,
        subject: "Contact Request",
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