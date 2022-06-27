const fs = require('fs');

exports.configurePackageJson = (
	projectName,
	templatePath,
	CURRENT_DIRECTORY
) => {
	const file = fs.readFileSync(`${templatePath}/package.json`, 'utf-8');

	let updatedFile = file.replace(
		/project-name/g,
		`${projectName.toLowerCase()}`
	);

	fs.writeFileSync(
		`${CURRENT_DIRECTORY}/${projectName}/package.json`,
		updatedFile,
		'utf-8'
	);
};
