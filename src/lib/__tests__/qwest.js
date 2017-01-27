// import firebase from 'firebase';
// import FirebaseServer from 'firebase-server';
// import firebaseConfig from '../../config/firebase.json';
// import { createQwest } from '../qwest';

// create Firebase Mock Server
// let mockServer = new FirebaseServer(5000, 'localhost.firebaseio.test', {
//   states: {
//     CA: 'California',
//     AL: 'Alabama',
//     KY: 'Kentucky'
//   }
// });
// mockServer.close();

// console.log('mockServer: ' + Object.keys(mockServer));
// console.log('mockServer.app: ' + JSON.stringify(mockServer.app));

// initialize Firebase
// let app = firebase.initializeApp({
//   apiKey: "mockAPIKey",
//   authDomain: "mockAuthDomain",
//   storageBucket: "mockStorageBucket",
//   databaseURL: "ws://localhost.firebaseio.test"
// });

// console.log('database ref: ' + firebase.database().ref());

// firebase.database().ref().on('value', function(snap) {
//   console.log('Starting value: ', snap.val());
// });

// console.log('firebase: ' + firebase.auth());

it('works', () => {
  // // Create User data object
  // const userData = {
  //   uid: 'test'
  // };
  //
  // // Create Qwest data object.
  // const qwestData = {
  //   title: 'Test'
  // };
  // createQwest(userData, qwestData, function(data) {
  //   console.log('createQwest done!');
  // });
  //
  // firebase.database().ref().on('value', function(snap) {
  //   console.log('Test value: ', snap.val());
  // });

  expect(true);
});

// afterAll(() => {
//   console.log('tests complete!');
//   // app.delete(); // Release resources
//
//   // close Firebase Mock Server
//   // console.log('mockServer.app: ' + JSON.stringify(mockServer.app));
//   mockServer._wss.close(() => {
//     console.log('server closed');
//     console.log('mockServer keys: ' + Object.keys(mockServer));
//     console.log('mockServer.app: ' + Object.keys(mockServer.app));
//     console.log('mockServer.app.database: ' + Object.keys(mockServer.app.database()));
//   });
// });
