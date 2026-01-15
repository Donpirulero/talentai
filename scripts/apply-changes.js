import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * TalentAI Code Applicator
 * Parses files formatted as:
 * --- FILE: path/to/file.tsx ---
 * (content)
 * --- END FILE ---
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceFile = process.argv[2];

if (!sourceFile) {
    console.error("Usage: node scripts/apply-changes.js <path-to-agent-code.md>");
    process.exit(1);
}

function applyChanges() {
    const filePath = path.isAbsolute(sourceFile) ? sourceFile : path.join(rootDir, sourceFile);

    if (!fs.existsSync(filePath)) {
        console.error(`❌ Source file not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Regex to find file blocks
    const fileRegex = /--- FILE: (.*?) ---\n([\s\S]*?)\n--- END FILE ---/g;
    let match;
    let appliedCount = 0;

    console.log(`\n🛠  Applying Agentic Updates...`);

    while ((match = fileRegex.exec(content)) !== null) {
        const relativePath = match[1].trim();
        const code = match[2].trim();
        const fullPath = path.join(rootDir, relativePath);

        try {
            // Backup original if exists
            if (fs.existsSync(fullPath)) {
                const backupDir = path.join(rootDir, '_agent_backups', Date.now().toString());
                fs.mkdirSync(backupDir, { recursive: true });
                fs.copyFileSync(fullPath, path.join(backupDir, path.basename(fullPath)));
            }

            // Write new content
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, code);
            console.log(`✅ Applied: ${relativePath}`);
            appliedCount++;
        } catch (e) {
            console.error(`❌ Error applying ${relativePath}: ${e.message}`);
        }
    }

    if (appliedCount === 0) {
        console.warn("⚠️ No valid file blocks found in the source file.");
    } else {
        console.log(`\n🎉 Successfully applied ${appliedCount} changes.`);
    }
}

applyChanges();
