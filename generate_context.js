import fs from 'fs';
import path from 'path';

const outputFile = 'project_codebase.txt';
const rootDir = '.';

const dirsToInclude = [
    'pages',
    'components',
    'services',
    'contexts',
    'utils',
    'hooks',
    'data',
    'scripts',
    'talentos'
];

const filesToInclude = [
    'App.tsx',
    'main.tsx',
    'index.css',
    'types.ts',
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'tailwind.config.js',
    'postcss.config.js'
];

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            // Filter functionality: include only code files
            if (file.match(/\.(ts|tsx|js|jsx|css|json)$/)) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

let allFiles = [];

// Add specific top-level files
filesToInclude.forEach(file => {
    if (fs.existsSync(file)) {
        allFiles.push(path.join(rootDir, file));
    }
});

// Add directories
dirsToInclude.forEach(dir => {
    allFiles = getAllFiles(path.join(rootDir, dir), allFiles);
});

let outputContent = "";

allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        outputContent += `\n\n--- START OF FILE: ${file} ---\n\n`;
        outputContent += content;
        outputContent += `\n\n--- END OF FILE: ${file} ---\n`;
    } catch (err) {
        console.error(`Error reading file ${file}: ${err.message}`);
    }
});

fs.writeFileSync(outputFile, outputContent);
console.log(`Successfully created ${outputFile} with ${allFiles.length} files.`);
