import User from '../'

it('successfully updates a User object', () => {
  // Create User object
  const user = new User({
    displayName: 'User Display Name',
    photoURL: 'http://profileImage.png'
  })

  // Update the User
  user.update({
    displayName: 'Changed Display Name'
  })

  // Expect that the User object has been updated
  expect(user.displayName).toBe('Changed Display Name')
})
