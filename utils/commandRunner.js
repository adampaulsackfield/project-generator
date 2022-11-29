import { exec } from 'child_process';

export const commandRunner = async (command, projectPath) => {
	process.chdir(`${projectPath}`);

	return await exec(`${command}`, (error, stdout, stderr) => {
		if (error) {
			console.log(`error: ${error.message}`);
			return false;
		}
		if (stderr) {
			console.log(`stderr: ${stderr}`);
			return false;
		}

		return true;
	});
};
