#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import fs from 'fs';
import { createDirectoryContents } from './utils/createDirectoryContents.js';
import { configureIndex } from './utils/configureIndex.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CURRENT_DIRECTORY = process.cwd();
const TEMPLATES = fs.readdirSync(`${__dirname}/templates`);

let selectedTemplate;
let projectName;
let templatePath;

console.log(__dirname);
const QUESTIONS = [
	{
		name: 'selected-template',
		type: 'list',
		message: 'Choose a project template to generate?',
		choices: TEMPLATES,
	},
	{
		name: 'project-name',
		type: 'input',
		message: 'Project Name: ',
		validate: function (input) {
			if (/^([a-z\-\_\d])+$/.test(input)) return true;
			else
				return 'Project name may only include letters, numbers, underscores and hashes.';
		},
	},
];

const prompt = inquirer.createPromptModule();
prompt(QUESTIONS).then((answers) => {
	console.log(answers);

	selectedTemplate = answers['selected-template'];
	projectName = answers['project-name'];
	templatePath = `${__dirname}/templates/${selectedTemplate}`;

	fs.mkdirSync(`${CURRENT_DIRECTORY}/${projectName}`);

	createDirectoryContents(templatePath, projectName, CURRENT_DIRECTORY);

	configureIndex(projectName, templatePath, CURRENT_DIRECTORY);
});
