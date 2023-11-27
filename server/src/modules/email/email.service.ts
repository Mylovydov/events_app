import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

class EmailService {
	transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				pass: process.env.EMAIL_PASSWORD,
				user: process.env.EMAIL_USER
			}
		});

		this.transporter
			.verify()
			.then(value => {
				console.log('value', value);
			})
			.catch(reason => {
				console.log('reason', reason);
			});
	}
	async addEmailSettings() {}

	async sendInvitationToEvent() {
		await this.transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: 'den.milovidov.91@gmail.com',
			subject: 'Invitation to event',
			html: '<h1>Invitation to event</h1>'
		});
	}
}

export default new EmailService();
