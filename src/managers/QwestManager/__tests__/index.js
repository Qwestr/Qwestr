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

  // Create test assigning User ID
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

  // set the authorized User ID to the assigned User
  firebase.__setAuthUserId(assignedUserId)

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

  // set the authorized User ID to the assigned User
  firebase.__setAuthUserId(assignedUserId)

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

  // set the authorized User ID to the assigned User
  firebase.__setAuthUserId(assignedUserId)

  // Accept the Qwest
  qwestManager.accept('mockId1')

  // Reset the authorized User back to the original User
  firebase.__resetAuthUserId()

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

it('successfully shares a Qwest', () => {
  // Create a new Qwest
  const qwest = createNewQwest()

  // Create an initial User Qwests object
  let userQwests = {}

  // Create a new QwestManager and get all User Qwests
  const qwestManager = new QwestManager()
  qwestManager.getAllUserQwests((data) => {
    userQwests = data
  })

  // Create test shared User ID
  const sharedUserId = 'testUserId'

  // Share the Qwest
  qwestManager.share('mockId1', sharedUserId)

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct Qwest data has been created/ updated
  expect(database['qwests']['mockId1'].sharedWith[sharedUserId]).toBeTruthy()

  // Expect that the correct User Qwest data has been created/ updated
  expect(userQwests.active).toBeTruthy()
  expect(userQwests.active['mockId1'].sharedWith[sharedUserId]).toBeTruthy()
  expect(database['user-qwests'][sharedUserId]['shared']['mockId1'].sharedBy).toBe(qwest.createdBy)
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

  // set the authorized User ID to the assigned User
  firebase.__setAuthUserId(assignedUserId)

  // Accept the Qwest
  qwestManager.accept('mockId1')

  // Reset the authorized User back to the original User
  firebase.__resetAuthUserId()

  // Drop the assigned Qwest
  qwestManager.dropAssigned('mockId1')

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
//
// it('successfully removes a Qwest', () => {
//   // Get authorized User ID
//   const currentAuthUserId = firebase.__getAuthUserId()
//
//   // Create test assigning User ID
//   const assigningUserId = 'testUserId'
//
//   // Create Qwest data objects
//   const qwestData = {
//     title: 'Test Qwest'
//   }
//
//   const assignedQwestData = {
//     title: 'Test Qwest',
//     assignedBy: currentAuthUserId,
//     assignedTo: assigningUserId
//   }
//
//   // Create the Qwest
//   createQwest(qwestData)
//
//   // Assign the Qwest
//   assignQwest(qwestData, 'mockId1', assigningUserId)
//
//   // set the authorized User ID to the assigning User
//   firebase.__setAuthUserId(assigningUserId)
//
//   // Accept the Qwest
//   acceptQwest(assignedQwestData, 'mockId1')
//
//   // Complete the Qwest
//   completeQwest(assignedQwestData, 'mockId1')
//
//   // Remove the Qwest
//   removeQwest('mockId1')
//
//   // Get resulting database
//   const database = firebase.__getMockDatabase()
//
//   // Expect that the approriate Qwests have been created/ updated
//   expect(Object.keys(database['qwests'])).toHaveLength(1)
//   expect(database['qwests']['mockId1'].assignedTo).toBeTruthy()
//
//   // Expect that the approriate User Qwests have been created/ updated
//   expect(Object.keys(database['user-qwests'])).toHaveLength(1)
//   expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1)
//   expect(Object.keys(database['user-qwests'][currentAuthUserId]['completed'])).toHaveLength(1)
// })
//
// it('successfully deletes a Qwest', () => {
//   // Create Qwest data object
//   const qwestData = {
//     title: 'Test Qwest'
//   }
//
//   // Create the Qwest
//   createQwest(qwestData)
//
//   // Delete the Qwest
//   deleteQwest(qwestData, 'mockId1')
//
//   // Get resulting database
//   const database = firebase.__getMockDatabase()
//
//   // Expect that the approriate Qwests have been deleted
//   expect(database['qwests']).toBeFalsy()
//
//   // Expect that the approriate User Qwests have been deleted
//   expect(database['user-qwests']).toBeFalsy()
// })
