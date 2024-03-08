# Welcome to the showdown

### Project Setup
Run the following command to install project dependencies:

`npm install`

If you run into issues installing, check to make sure you have node.js installed with version >= 18 using the command:

`node --version`

Install if needed, or if your version is outdated, update to latest version using:

`nvm install node`

Also, check your IDE language settings and make sure it is using a node interpreter that matches the version of node you
are intending to use.

Then run `npm install` again and that should clear up any possible issues.

### Running the Project

To run the project locally, use the command:

`npm run dev`

This will run a local version of the project with a temporary local database for feature testing purposes. It will also
have hot reloading so changes to the code will appear in the browser in real-time.

### Repo Structure
- .github - Files related to Github Actions, which automates deployment to the cloud if you push to main/master. (haven't set this up yet)
- app - Main code for the remix application
  - components - For re-usable react components which we can use across many pages in our app.
  - models - This is where we store functions related to backend functionality.
  - routes - This one is where our frontend react code goes. Our app's frontend routes are automatically setup based on the names of files placed in here.
- cypress - Files related to running tests on our app using Cypress (will probably delete)
- mocks - For mock stuff to be used in tests (will probably delete)
- public - This is where our static front end code is stored. Files from /app will be transpiled and automatically placed here whenever we run the build command so that they can be deployed to s3
- server - Same deal as the public folder, except this is where post-build server code is placed prior to lambda deployment
- test - For unit/integration tests (will probably delete)

