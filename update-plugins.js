const fs = require('fs');
const { keyword } = require('./npm-search.js');

(async function main() {
	let plugins = await keyword('qunit-plugin');
	plugins = plugins.map((plugin) => ({
		name: plugin.name,
		description: plugin.description,
		date: plugin.date
	}));
	fs.writeFileSync('./_data/plugins.json', JSON.stringify(plugins, null, 2) + '\n');
}());
