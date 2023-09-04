import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

const jsonReportsDir = `${process.cwd()}/reports/json`;

export function createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}

createDirectory(jsonReportsDir);