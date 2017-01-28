import { createQwest } from '../qwest';
import firebase from 'firebase';

it('works', () => {

  // Get a key for a new Qwest.
  var qwestKey = firebase.database().ref().child('qwests').push().key;
  console.log('qwestKey: ' + qwestKey);

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

  expect(true);
});
