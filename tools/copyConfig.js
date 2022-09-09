const fs = require('fs');
const path = require('path');

const backupFile = path.join(__dirname, '../tsconfig.backup.json');
const configFile = path.join(__dirname, '../tsconfig.json');

fs.copyFileSync(backupFile, configFile);
