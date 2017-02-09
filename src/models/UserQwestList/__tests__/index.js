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
    title: 'Test Qwest'
  })

  qwest.create()

  // Create User Qwest List and get all User Qwests
  const userQwestList = new UserQwestList()

  userQwestList.getAll(() => {})

  // Expect that the correct list of User Qwests has been returned
  expect(Object.keys(userQwestList)).toHaveLength(1)
  expect(Object.keys(userQwestList['active'])).toHaveLength(1)
})
