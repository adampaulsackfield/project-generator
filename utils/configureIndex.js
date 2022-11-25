import fs from 'fs';

export const configureIndex = (
	projectName,
	templatePath,
	CURRENT_DIRECTORY
) => {
	const file = fs.readFileSync(`${templatePath}/index.html`, 'utf-8');

	let updatedFile = file.replace(/project-name/g, `${projectName}`);

	fs.writeFileSync(
		`${CURRENT_DIRECTORY}/${projectName}/index.html`,
		updatedFile,
		'utf-8'
	);
};
