const { execSync } = require('child_process');

exports.createReactApp = (projectName, CURRENT_DIRECTORY) => {
	execSync(
		`cd ${CURRENT_DIRECTORY} && npx create-react-app ${projectName}`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`Error: ${error.message}`);
				return;
			}

			if (stderr) {
				console.error(`Error: ${stderr}`);
				return;
			}

			return console.log(`Result: ${stdout}`);
		}
	);
};
