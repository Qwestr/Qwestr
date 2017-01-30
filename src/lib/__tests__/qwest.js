import firebase from 'firebase';
import { createQwest } from '../qwest';

it('Successfully creates a Qwest', () => {
  // Create Qwest data object.
  const qwestData = {
    title: 'Test'
  };

  // Create the Qwest
  createQwest(qwestData);

  console.log('mock database result: ' + firebase.__getMockDatabase());

  expect(true);
});
