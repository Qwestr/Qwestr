# Qwestr

A gameified task management application

## Deployment

1.  Copy contents of file from **/.example.env** to **/.env.development**, **/.env.staging** and **/.env.production** (update values)

2.  Copy contents of file from **.firebaserc.example** to **.firebaserc** (update values) (NOTE: use can also use the Firebase CLI command `firebase use -add` to add projects to the file)

3.  Install all required packages using `npm install`

3.  Run `npm run build` to build the code

4.  Install and initialize the [Firebase CLI](https://firebase.google.com/docs/cli)

5.  Run `firebase deploy` to deploy the code to Firebase (NOTE: use can also use the Firebase CLI command `firebase use <project-name>` to deploy to different Firebase projects)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build:develop`

Builds the app for the development environment

### `npm run build:staging`

Builds the app for the staging environment

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run format:check`

Runs a formatting check on off of the files

### `npm run format`

Formats the code files

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Firebase

The application currently utilizes [Firebase](https://firebase.google.com/) as its solution for:

- Authentication Management
- Database (via [Firestore](https://firebase.google.com/docs/firestore))
- Hosting

Many operations, such as initialization and deployment, can be done via the [Firebase CLI](https://firebase.google.com/docs/cli)

### Indexes

Database indexes are stored in **/firestore.indexes.json**.  They can be deployed independently via the CLI command:

`firebase deploy --only firestore:indexes`

You can list currently deployed indexes with:

`firebase firestore:indexes`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
