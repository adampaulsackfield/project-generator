#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');
const utils = require('./utils');
const { execSync } = require('child_process');

const CURRENT_DIRECTORY = process.cwd();
const TEMPLATES = fs.readdirSync(`${__dirname}/templates`);

let selectedTemplate;
let projectName;
let templatePath;

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

const BACKEND_QUESTIONS = [
	{
		name: 'selected-dependencies',
		type: 'checkbox',
		message: 'Which dependencies do you require?',
		choices: [
			'bcryptjs',
			'cors',
			'dotenv',
			'express',
			'jest',
			'jsonwebtoken',
			'mongoose',
			'nodemon',
			'pg',
		],
	},
];

const REACT_QUESTIONS = [
	{
		name: 'selected-dependencies',
		type: 'checkbox',
		message: 'Which dependencies do you require?',
		choices: [
			'firebase',
			'hamburger-react',
			'react-icons',
			'react-router-dom',
			'react-scroll',
			'react-toastify',
		],
	},
];

inquirer
	.prompt(QUESTIONS)
	.then((answers) => {
		console.log(answers);

		selectedTemplate = answers['selected-template'];
		projectName = answers['project-name'];
		templatePath = `${__dirname}/templates/${selectedTemplate}`;

		if (selectedTemplate === 'NPM-Backend') {
			fs.mkdirSync(`${CURRENT_DIRECTORY}/${projectName}`);

			utils.createDirectoryContents(
				templatePath,
				projectName,
				CURRENT_DIRECTORY
			);
			utils.configurePackageJson(projectName, templatePath, CURRENT_DIRECTORY);

			return inquirer.prompt(BACKEND_QUESTIONS);
		} else if (selectedTemplate === 'React') {
			utils.createReactApp(projectName, CURRENT_DIRECTORY);

			return inquirer.prompt(REACT_QUESTIONS);
		}

		return;
	})
	.then((answers) => {
		const dependencyChoices = answers['selected-dependencies'];

		if (dependencyChoices.length) {
			console.log('Installing dependencies...');

			utils.installDependencies(
				dependencyChoices,
				projectName,
				CURRENT_DIRECTORY
			);
		}
	});
