import firebase from 'firebase'
import Qwest from '../'

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

it('successfully creates a Qwest', () => {
  // Get authorized User ID
  const currentAuthUserId = firebase.__getAuthUserId()

  // Create Qwest object and save
  const newQwest = new Qwest({
    title: 'New Qwest',
    description: 'A description of the Qwest'
  })
  newQwest.create()

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the approriate Qwests have been created/ updated
  expect(Object.keys(database['qwests'])).toHaveLength(1)
  expect(database['qwests']['mockId1'].title).toBe(newQwest.title)
  expect(database['qwests']['mockId1'].description).toBe(newQwest.description)
  expect(database['qwests']['mockId1'].createdBy).toBe(currentAuthUserId)

  // Expect that the approriate User Qwests have been created/ updated
  expect(Object.keys(database['user-qwests'])).toHaveLength(1)
  expect(Object.keys(database['user-qwests'][currentAuthUserId])).toHaveLength(1)
  expect(Object.keys(database['user-qwests'][currentAuthUserId]['active'])).toHaveLength(1)
  expect(database['user-qwests'][currentAuthUserId]['active']['mockId1'].title).toBe(newQwest.title)
})

it('successfully updates a Qwest', () => {
  // Create Qwest object
  const newQwest = new Qwest({
    title: 'New Qwest',
    description: 'A description of the Qwest'
  })

  // Update the Qwest object
  const updatedQwestData = {
    title: 'Updated Qwest Title',
    'description': 'An updated description of the Qwest'
  }
  newQwest.update(updatedQwestData)

  // Expect that the Qwest has been successfully created/ updated
  expect(newQwest.title).toBe(updatedQwestData.title)
  expect(newQwest.description).toBe(updatedQwestData.description)
})
