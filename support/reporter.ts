import * as path from 'path';
const rootDir = process.cwd();
const jsonReportsDir = path.join(rootDir, '/reports/json');
const htmlReportsDir = path.join(rootDir, '/reports/html');
const targetJson = `${jsonReportsDir}/cucumber_report.json`;
var reporter = require('cucumber-html-reporter');

const cucumberReporterOptions = {
    jsonFile: targetJson,
    output: `${htmlReportsDir}/cucumber_reporter.html`,
    reportSuiteAsScenarios: true,
    theme: 'bootstrap',
};

export function createHTMLReport() {
    try {
        reporter.generate(cucumberReporterOptions);
    } catch (err) {
        if (err) {
            throw new Error('Error is cures when try to save cucumber test results to json file.');
        }
    }
}

createHTMLReport();