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

  // Expect that the correct Qwest data has been created
  expect(qwestManager.userQwests).toBe(userQwests)
  expect(userQwests.active).toBeTruthy()
  expect(userQwests.active['mockId1'].title).toBe(qwest.title)
})
