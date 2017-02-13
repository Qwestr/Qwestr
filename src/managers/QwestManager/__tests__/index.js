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
  expect(userQwests.completed).toBeTruthy()
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
  expect(userQwests.active).toBeTruthy()
  expect(userQwests.completed).toBeFalsy()
  expect(userQwests.active['mockId1'].title).toBe(qwest.title)
})
