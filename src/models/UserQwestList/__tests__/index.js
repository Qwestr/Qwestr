import firebase from 'firebase'
import Qwest from '../../Qwest'
import UserQwestList from '../'

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

it('successfully returns a list of User Qwests', () => {
  // Create Qwest object and save
  const qwest = new Qwest({
    title: 'New Qwest'
  })
  qwest.create()

  // Create User Qwest List and get all User Qwests
  const userQwestList = new UserQwestList()
  userQwestList.getAll(() => {})

  // Expect that the correct list of User Qwests has been returned
  expect(userQwestList['active']).toBeFalsy()
})

it('successfully completes a User Qwest', () => {
  // Create Qwest object and save
  const qwest = new Qwest({
    title: 'Complete Qwest'
  })
  qwest.create()

  // Create User Qwest List and get all User Qwests
  const userQwestList = new UserQwestList()
  userQwestList.getAll(() => {})

  // Complete the Qwest
  userQwestList.complete('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the approriate Qwests have been created/ updated
  expect(Object.keys(database['qwests'])).toHaveLength(1)
  expect(database['qwests']['mockId1']['completed']).toBeTruthy()

  // Expect that the approriate User Qwests have been created/ updated
  expect(userQwestList['active']).toBeFalsy()
  expect(userQwestList['completed']).toBeTruthy()
})

it('successfully restarts a User Qwest', () => {
  // Create Qwest object and save
  const qwest = new Qwest({
    title: 'Restart Qwest'
  })
  qwest.create()

  // Create User Qwest List and get all User Qwests
  const userQwestList = new UserQwestList()
  userQwestList.getAll(() => {})

  // Complete the Qwest
  userQwestList.complete('mockId1')

  // Restart the Qwest
  userQwestList.restart('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the approriate Qwests have been created/ updated
  expect(Object.keys(database['qwests'])).toHaveLength(1)
  expect(database['qwests']['mockId1']['completed']).toBeFalsy()

  // Expect that the approriate User Qwests have been created/ updated
  expect(userQwestList['completed']).toBeFalsy()
  expect(userQwestList['active']).toBeTruthy()
})

it('successfully assigns a User Qwest', () => {
  // Create test assigning User ID
  const assignedUserId = 'testUserId'

  // Create Qwest object and save
  const qwest = new Qwest({
    title: 'Assign Qwest'
  })
  qwest.create()

  // Create User Qwest List and get all User Qwests
  const userQwestList = new UserQwestList()
  userQwestList.getAll(() => {})

  // Assign the Qwest
  userQwestList.assign('mockId1', assignedUserId)

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the approriate Qwests have been created/ updated
  expect(Object.keys(database['qwests'])).toHaveLength(1)
  expect(database['qwests']['mockId1']['assignedTo']).toBe(assignedUserId)

  // Expect that the approriate User Qwests have been created/ updated
  expect(userQwestList['active']).toBeFalsy()
  expect(userQwestList['assigned']).toBeTruthy()
  expect(userQwestList['assigned']['mockId1']['assignedTo']).toBe(assignedUserId)
  expect(database['user-qwests'][assignedUserId]['pending']['mockId1']['assignedBy']).toBe(qwest.createdBy)
})
