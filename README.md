# cypress-easygenerator

Automation Framework using below components:
Page Object Model
Fixtures
Mochawesome HTML Report
Customized Scripts in Package.json
Running using headless and headed modes
GitHub Actions using workflows (.yml files)
All the required resources like the application under test (task.html),alert-text.txt,file to upload(sampleImage.png) are integrated to the framework

Different ways to execute the Scripts:
npx cypress open --> Click on the particular spec file to execute
npm run task-scripts-headless
npm run task-scripts-headed
Click and run the workflow present in the Actions tab in the Github repo (https://github.com/SM1989/cypress-easygenerator/actions/workflows/build.yml)
