import firebase from 'firebase';
import { createQwest } from '../qwest';

it('Successfully creates a Qwest', () => {
  // Create Qwest data object.
  const qwestData = {
    title: 'New Qwest'
  };

  // Create the Qwest
  createQwest(qwestData);

  // Get authorized User ID
  const currentAuthUserId = firebase.auth().currentUser.uid

  // Get resulting database
  const database = firebase.__getMockDatabase();

  // Expect that the new Qwest has been created with the proper information
  expect(Object.keys(database['qwests'])).toHaveLength(1);
  expect(database['qwests'][1].title).toBe('New Qwest');
  expect(database['qwests'][1].createdBy).toBe(currentAuthUserId);

  // Expect that the new Active User Qwest has been created with the proper information
  expect(Object.keys(database['user-qwests'])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId]['active'])).toHaveLength(1);
  expect(database['user-qwests'][currentAuthUserId]['active'][1].title).toBe('New Qwest');
});
