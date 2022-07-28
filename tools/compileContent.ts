/**
 * Compile content files to JSON so they can be imported normally.
 * This is run from ts-node
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// import fs from 'fs';
// import path from 'path';
// import yaml from 'yaml';

const ORIGINAL_CONTENT_FOLDER = path.join(__dirname, '../framework/content');
const COMPILED_CONTENT_FOLDER = path.join(__dirname, '../framework/content-compiled');

function compileYaml(relativePath: string): void {
    const input = fs.readFileSync(path.join(ORIGINAL_CONTENT_FOLDER, relativePath)).toString();
    const parsed = yaml.parse(input);
    fs.writeFileSync(path.join(COMPILED_CONTENT_FOLDER, withoutExtension(relativePath) + '.json'), JSON.stringify(parsed));
};

function compileMarkdown(relativePath: string): void {
    const input = fs.readFileSync(path.join(ORIGINAL_CONTENT_FOLDER, relativePath)).toString();
    fs.writeFileSync(path.join(COMPILED_CONTENT_FOLDER, withoutExtension(relativePath) + '.json'), JSON.stringify({ text: input }));
};

function generatePathsList(dirPath: string) {
    const contents = fs.readdirSync(dirPath).map((relativePath: string) => path.join(dirPath, relativePath));

    let pathsList: string[] = [];

    for (const dirOrFile of contents) {
        if (fs.statSync(dirOrFile).isDirectory()) {
            pathsList = pathsList.concat(generatePathsList(dirOrFile));
            fs.mkdirSync(path.join(COMPILED_CONTENT_FOLDER, relativePathOf(dirOrFile)));
        } else {
            pathsList.push(dirOrFile);
        }
    }

    return pathsList;
}

function withoutExtension(path: string) {
    return path.split('.' + extensionOf(path))[0];
}

function extensionOf(path: string) {
    return path.split('.')[path.split('.').length - 1];
}

function categoryFrom(path: string) {
    return path.split('/')[path.split('/').length - 2];
}

function nameFrom(path: string) {
    return path.split('/')[path.split('/').length - 1];
}

function relativePathOf(path: string) {
    return path.split(ORIGINAL_CONTENT_FOLDER)[1];
}

function firstUpper(str: string) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}

function categoryAndNameFrom(path: string) {
    const pathNoExt = withoutExtension(path);
    const category = categoryFrom(pathNoExt);
    const name = nameFrom(pathNoExt);
    return category + firstUpper(name);
}

function compile() {
    if (fs.statSync(COMPILED_CONTENT_FOLDER, { throwIfNoEntry: false })) {
        fs.rmdirSync(COMPILED_CONTENT_FOLDER, { recursive: true });
    }
    fs.mkdirSync(COMPILED_CONTENT_FOLDER);

    const paths = generatePathsList(ORIGINAL_CONTENT_FOLDER);

    for (const path of paths) {
        if (extensionOf(path) === 'yaml') {
            compileYaml(relativePathOf(path));
        } else {
            compileMarkdown(relativePathOf(path));
        }
    }

    const names = paths.map(categoryAndNameFrom);

    const imports = paths.map((path: string) => {
        const pathNoExt = withoutExtension(path);
        const categoryAndName = categoryAndNameFrom(path);
        
        return `import ${categoryAndName} from '.${relativePathOf(pathNoExt)}.json';`;
    });

    const importsFile = imports.join('\n') + '\n\n' + `export { ${names.join(', ') }};` + '\n';

    fs.writeFileSync(path.join(COMPILED_CONTENT_FOLDER, 'graphData.ts'), importsFile);
}

compile();

module.exports = {};
