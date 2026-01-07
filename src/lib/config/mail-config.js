import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } from '$env/static/private';

export const smtpTransport = {
  host: SMTP_HOST,
  port: parseInt(SMTP_PORT, 10),
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
};