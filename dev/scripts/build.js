const fs = require('fs');
const { copy, CommonScripts } = require('@eigenspace/helper-scripts');

const target = 'dist';

if(fs.existsSync(target)) {
    CommonScripts.removeDirectory(target);
}

copy(['scripts', 'package.json', 'server.js', 'yarn.lock'], target);