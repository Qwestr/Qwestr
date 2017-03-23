import firebase from 'firebase'
import Qwest from '../../../models/Qwest'
import QwestManager from '../'

function createNewQwest() {
  // Create Qwest object and save
  const qwest = new Qwest({
    title: 'New Qwest'
  })
  qwest.create()

  return qwest
}

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

it('successfully returns an empty list of User Qwests', () => {
  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Expect that the correct User Qwest data has been created/ updated
  expect(qwestManager.userQwests).toBe(userQwests)
})

it('successfully returns a list of User Qwests', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Expect that the correct User Qwest data has been created/ updated
  expect(qwestManager.userQwests).toBe(userQwests)
  expect(userQwests.active['mockId1'].title).toBe(qwest.title)
})

it('successfully completes a Qwest', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Complete the Qwest
  qwestManager.complete('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].completed).toBeTruthy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.active).toBeFalsy()
  expect(userQwests.completed['mockId1'].title).toBe(qwest.title)
})

it('successfully restarts a Qwest', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Complete the Qwest
  qwestManager.complete('mockId1')

  // Restart the Qwest
  qwestManager.restart('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].completed).toBeFalsy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.completed).toBeFalsy()
  expect(userQwests.active['mockId1'].title).toBe(qwest.title)
})

it('successfully assigns a Qwest', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test assigned User ID
  const assignedUserId = 'testUserId'

  // Assign the Qwest
  qwestManager.assign('mockId1', assignedUserId)

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].assignedTo).toBe(assignedUserId)

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.active).toBeFalsy()
  expect(userQwests.assigned['mockId1'].assignedTo).toBe(assignedUserId)
  expect(database['user-qwests'][assignedUserId]['pending']['mockId1'].assignedBy).toBe(qwest.createdBy)
})

it('successfully accepts a Qwest', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test assigned User ID
  const assignedUserId = 'testUserId'

  // Assign the Qwest
  qwestManager.assign('mockId1', assignedUserId)

  // Accept the Qwest
  qwestManager.accept('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].accepted).toBeTruthy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.assigned['mockId1'].accepted).toBeTruthy()
  expect(database['user-qwests'][assignedUserId]['pending']).toBeFalsy()
  expect(database['user-qwests'][assignedUserId]['active']['mockId1'].assignedBy).toBe(qwest.createdBy)
})

it('successfully rejects a Qwest', () => {
  // Create a new Qwest
  createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test assigned User ID
  const assignedUserId = 'testUserId'

  // Assign the Qwest
  qwestManager.assign('mockId1', assignedUserId)

  // Reject the Qwest
  qwestManager.reject('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].assignedTo).toBeFalsy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.assigned).toBeFalsy()
  expect(userQwests.active['mockId1'].assignedTo).toBeFalsy()
  expect(database['user-qwests'][assignedUserId]).toBeFalsy()
})

it('successfully revokes a Qwest', () => {
  // Create a new Qwest
  createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test assigned User ID
  const assignedUserId = 'testUserId'

  // Assign the Qwest
  qwestManager.assign('mockId1', assignedUserId)

  // Accept the Qwest
  qwestManager.accept('mockId1')

  // Revoke the Qwest
  qwestManager.revoke('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].assignedTo).toBeFalsy()
  expect(database['qwests']['mockId1'].accepted).toBeFalsy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.assigned).toBeFalsy()
  expect(userQwests.active['mockId1'].assignedTo).toBeFalsy()
  expect(database['user-qwests'][assignedUserId]).toBeFalsy()
})

it('successfully drops an assigned Qwest', () => {
  // Create a new Qwest
  createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test assigned User ID
  const assignedUserId = 'testUserId'

  // Assign the Qwest
  qwestManager.assign('mockId1', assignedUserId)

  // Accept the Qwest
  qwestManager.accept('mockId1')

  // Drop the assigned Qwest
  qwestManager.drop('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].assignedTo).toBeFalsy()
  expect(database['qwests']['mockId1'].accepted).toBeFalsy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.assigned).toBeFalsy()
  expect(userQwests.active['mockId1'].assignedTo).toBeFalsy()
  expect(database['user-qwests'][assignedUserId]).toBeFalsy()
})

it('successfully deletes a Qwest', () => {
  // Create a new Qwest
  createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Delete the Qwest
  qwestManager.delete('mockId1')

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']).toBeFalsy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.active).toBeFalsy()
})
