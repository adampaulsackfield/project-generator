const { createDirectoryContents } = require('./createDirectoryContents');
const { configurePackageJson } = require('./configurePackageJson');
const { installDependencies } = require('./installDependencies');
const { createReactApp } = require('./createReactApp');

module.exports = {
	createDirectoryContents,
	configurePackageJson,
	installDependencies,
	createReactApp,
};
