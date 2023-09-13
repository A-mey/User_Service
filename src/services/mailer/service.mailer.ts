import nodemailer from "nodemailer";

class Nodemailer {
	private static transporter: nodemailer.Transporter = nodemailer.createTransport({
		host: process.env.HOST, //"smtp.gmail.com"
		port: parseInt(process.env.PORT!, 10), //465
		secure: true,
		service: process.env.SERVICE, //"Gmail"

		auth: {
			user: process.env.EMAILID, //"a.may3pp@gmail.com"
			// pass: 'M1crobl0g',
			pass: process.env.PASSWORD //"pfyokviswhhbofap"
		}
	});

	constructor() {}

	static async sendMail(to: string, subject: string, html: string): Promise<unknown> {

		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			console.log(process.env.EMAILID);
			console.log("to", to);
			console.log("subject", subject);
			console.log("html", html);

			try {
				await this.transporter.sendMail({
					from: process.env.EMAILID, //'a.may3pp@gmail.com',
					to,
					subject,
					html
				}, (err, info) => {
					if (err) {
						// console.log(err)
						reject(err);
					}
					else {
						// console.log(info, "info")
						resolve(info);
					}
				});
			}
			catch(e: unknown) {
				// console.log(e.message)
			}

      
      
		});
	}
}

export default Nodemailer;