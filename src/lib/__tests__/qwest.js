import firebase from 'firebase';
import firebaseConfig from '../../config/firebase.json';
import { createQwest } from '../qwest';

// initialize Firebase
firebase.initializeApp(firebaseConfig);

it('works', () => {
  // Create User data object
  const userData = {
    uid: 'test'
  };

  // Create Qwest data object.
  const qwestData = {
    title: 'Test'
  };
  createQwest(userData, qwestData, function(data) {
    console.log('works!');
  })

  expect(true);
});
