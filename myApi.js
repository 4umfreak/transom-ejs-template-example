module.exports = {
	note: "This is a very simple example NodeJS app that uses TransomJS and the EJS Template module.",
	name: "My EJS Template Example App",
	transom: {
		requestLogger: {
			name: 'example requestLogger',
			streams: [
				{
					stream: process.stdout,
					level: "info"
				}
			]
		}		
	},
	definition: {
		template: {
			emailTemplatePath: 'my-email-templates',
			htmlTemplatePath: 'my-html-templates',
			data: {
				processInfo: `Running on ${process.platform}, Process Id: ${process.pid}`
			}
		}
	}
};