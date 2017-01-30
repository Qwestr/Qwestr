import { createQwest } from '../qwest';
import firebase from 'firebase';

it('works', () => {

  // var qwestKey = firebase.database().ref().child('qwests').push().key;
  const userId = firebase.auth().currentUser.uid;
  console.log('userId: ' + userId);

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
