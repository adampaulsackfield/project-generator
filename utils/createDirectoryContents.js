import fs from 'fs';

export const createDirectoryContents = (
	templatePath,
	projectName,
	CURRENT_DIRECTORY
) => {
	const filesToCreate = fs.readdirSync(templatePath);

	filesToCreate.forEach((fileOrDirectory) => {
		const sourceFilePath = `${templatePath}/${fileOrDirectory}`;

		const stats = fs.statSync(sourceFilePath);

		if (stats.isFile()) {
			const contents = fs.readFileSync(sourceFilePath, 'utf-8');

			const writePath = `${CURRENT_DIRECTORY}/${projectName}/${fileOrDirectory}`;

			fs.writeFileSync(writePath, contents, 'utf-8');
		} else if (stats.isDirectory()) {
			fs.mkdirSync(`${CURRENT_DIRECTORY}/${projectName}/${fileOrDirectory}`);

			// Recursively call to iterate directories
			createDirectoryContents(
				`${templatePath}/${fileOrDirectory}`,
				`${projectName}/${fileOrDirectory}`,
				CURRENT_DIRECTORY
			);
		}
	});
};
