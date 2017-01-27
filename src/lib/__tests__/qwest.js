// var proxyquire   = require('proxyquire');
// var MockFirebase = require('firebase-mock').MockFirebase;
// import FirebaseServer from 'firebase-server';
// import firebaseConfig from '../../config/firebase.json';
// import { createQwest } from '../qwest';
// var MockFirebase = require('firebase-mock').MockFirebase;
// import proxyquire from 'proxyquire';
// MockFirebase.MockFirebase;
// console.log('MockFirebase: ' + typeof(MockFirebase.MockFirebase));
// console.log('MockFirebase: ' + MockFirebase.MockFirebase());
// var MockFirebase = require('firebase-mock').MockFirebase;
// create Firebase Mock Server
// let mockServer = new FirebaseServer(5000, 'localhost.firebaseio.test', {
//   states: {
//     CA: 'California',
//     AL: 'Alabama',
//     KY: 'Kentucky'
//   }
// });
// mockServer.close();

// console.log('MockFirebase: ' + typeof(MockFirebase));
// var test = new MockFirebase('test');
// initialize Firebase
// jest.mock('firebase', () => {
//   return new MockFirebase.MockFirebase();
// });

import firebase from 'firebase';

console.log('database ref: ' + firebase.database());

// firebase.database().ref().on('value', function(snap) {
//   console.log('Starting value: ', snap.val());
// });

// console.log('firebase: ' + firebase.auth());

it('works', () => {
  // var mock;
  // var test = proxyquire('./src', {
  //   firebase: function (url) {
  //     return (mock = new MockFirebase(url));
  //   }
  // });
  // console.log('test: ' + test);
  // mock.flush();

  // jest.mock('firebase', (url) => {
  //   return new MockFirebase(url);
  // });

  // const mockFirebase = new MockFirebase.MockFirebase();
  // console.log('mockFirebase: ' + Object.keys(mockFirebase));
  // console.log('mockFirebase.ref: ' + Object.keys(mockFirebase.ref.ref));

  // mockFirebase.override();

  // // Create User data object
  // const userData = {
  //   uid: 'test'
  // };
  //
  // // Create Qwest data object.
  // const qwestData = {
  //   title: 'Test'
  // };
  //
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
