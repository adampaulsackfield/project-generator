const { execSync } = require('child_process');

exports.installDependencies = (
	dependencies,
	projectName,
	CURRENT_DIRECTORY
) => {
	execSync(
		`cd ${CURRENT_DIRECTORY}/${projectName} && npm install ${dependencies.join(
			' '
		)}`,
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
