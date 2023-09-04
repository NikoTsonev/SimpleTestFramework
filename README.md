# Simple test framework

## Installation

Clone this repository and run command

```
npm install
```

## Setup environment
In `.\appsettings.json` file you can setup test environment.
For example:
```
"HeadlessMode": true
```
replace `true` whit `false` to disable headless mode of the browser.  

Also you should set same valid credentials for login in platform in `TestData\logInData.json`.


## Executing tests
```
npm run test
```

## Generate code coverage report
```
npm run code-coverage-report
```

### Reports
After every test run is generate `cucumber-report.html` in root directory of project.
This html report is generate based on `reports\json\cucumber_report.json`.

For generating an code-coverage-report be sure is `UseCoverageReport` setting is set to `true`. 

