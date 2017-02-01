import firebase from 'firebase';
import { createQwest, completeQwest } from '../qwest';

afterEach(() => {
  firebase.__clearMockDatabase();
})

it('creates a Qwest', () => {
  // Get authorized User ID
  const currentAuthUserId = firebase.__getAuthUserId();

  // Create Qwest data object.
  const qwestData = {
    title: 'Test Qwest'
  };

  // Create the Qwest
  createQwest(qwestData);

  // Get resulting database
  const database = firebase.__getMockDatabase();

  // Expect that the new Qwest has been created with the proper information
  expect(Object.keys(database['qwests'])).toHaveLength(1);
  expect(database['qwests']['mockId1'].title).toBe('Test Qwest');
  expect(database['qwests']['mockId1'].createdBy).toBe(currentAuthUserId);

  // Expect that the new Active User Qwest has been created with the proper information
  expect(Object.keys(database['user-qwests'])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId]['active'])).toHaveLength(1);
  expect(database['user-qwests'][currentAuthUserId]['active']['mockId1'].title).toBe('Test Qwest');
});

it('completes a Qwest', () => {
  // Get authorized User ID
  const currentAuthUserId = firebase.__getAuthUserId();

  // Create Qwest data object.
  const qwestData = {
    title: 'Test Qwest'
  };

  // Create the Qwest
  createQwest(qwestData);

  // Complete the Qwest
  completeQwest(qwestData, 'mockId1');

  // Get resulting database
  const database = firebase.__getMockDatabase();

  // Expect that the new Qwest has been created and completed
  expect(Object.keys(database['qwests'])).toHaveLength(1);
  expect(database['qwests']['mockId1'].completed).toBeTruthy();

  // Expect that the new Completed User Qwest has been created
  // and Active User Qwest has been removed
  expect(Object.keys(database['user-qwests'])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1);
  expect(Object.keys(database['user-qwests'][currentAuthUserId]['completed'])).toHaveLength(1);
  expect(database['user-qwests'][currentAuthUserId]['completed']['mockId1'].title).toBe('Test Qwest');
});
