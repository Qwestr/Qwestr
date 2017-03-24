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

describe('getAllUserQwests()', () => {
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
})

describe('complete()', () => {
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
})

describe('restart()', () => {
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
})

describe('assign()', () => {
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
})

describe('accept()', () => {
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
})

describe('reject()', () => {
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
})

describe('revoke()', () => {
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
})

describe('drop()', () => {
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
})

describe('delete()', () => {
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
})

describe('update()', () => {
  it('successfully updates an active Qwest', () => {
    // Create a new Qwest
    createNewQwest()

    // Create an initial User Qwests object
    let userQwests = {}

    // Create a new QwestManager and get all User Qwests
    const qwestManager = new QwestManager()
    qwestManager.getAllUserQwests((data) => {
      userQwests = data
    })

    // Create an object with the updated Qwest data
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'Updated Qwest Description'
    }

    // Update the Qwest
    qwestManager.update('mockId1', updatedQwestData)

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the correct Qwest data has been updated
    expect(database['qwests']['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['qwests']['mockId1'].description).toBe(updatedQwestData.description)

    // Expect that the correct User Qwest data has been updated
    expect(userQwests.active['mockId1'].title).toBe(updatedQwestData.title)
  })

  it('successfully updates a completed Qwest', () => {
    // Create a new Qwest
    createNewQwest()

    // Create an initial User Qwests object
    let userQwests = {}

    // Create a new QwestManager and get all User Qwests
    const qwestManager = new QwestManager()
    qwestManager.getAllUserQwests((data) => {
      userQwests = data
    })

    // Complete the Qwest
    qwestManager.complete('mockId1')

    // Create an object with the updated Qwest data
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'Updated Qwest Description'
    }

    // Update the Qwest
    qwestManager.update('mockId1', updatedQwestData)

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the correct Qwest data has been updated
    expect(database['qwests']['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['qwests']['mockId1'].description).toBe(updatedQwestData.description)

    // Expect that the correct User Qwest data has been updated
    expect(userQwests.completed['mockId1'].title).toBe(updatedQwestData.title)
  })

  it('successfully updates an assigned pending Qwest', () => {
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

    // Create an object with the updated Qwest data
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'Updated Qwest Description'
    }

    // Update the Qwest
    qwestManager.update('mockId1', updatedQwestData)

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the correct Qwest data has been updated
    expect(database['qwests']['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['qwests']['mockId1'].description).toBe(updatedQwestData.description)

    // Expect that the correct User Qwest data has been updated
    expect(userQwests.assigned['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['user-qwests'][assignedUserId]['pending']['mockId1'].title).toBe(updatedQwestData.title)
  })

  it('successfully updates an assigned active Qwest', () => {
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

    // Create an object with the updated Qwest data
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'Updated Qwest Description'
    }

    // Update the Qwest
    qwestManager.update('mockId1', updatedQwestData)

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the correct Qwest data has been updated
    expect(database['qwests']['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['qwests']['mockId1'].description).toBe(updatedQwestData.description)

    // Expect that the correct User Qwest data has been updated
    expect(userQwests.assigned['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['user-qwests'][assignedUserId]['active']['mockId1'].title).toBe(updatedQwestData.title)
  })

  it('successfully updates an assigned completed Qwest', () => {
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

    // Complete the Qwest
    qwestManager.complete('mockId1')

    // Create an object with the updated Qwest data
    const updatedQwestData = {
      title: 'Updated Qwest Title',
      description: 'Updated Qwest Description'
    }

    // Update the Qwest
    qwestManager.update('mockId1', updatedQwestData)

    // Get resulting database
    const database = firebase.__getMockDatabase()

    // Expect that the correct Qwest data has been updated
    expect(database['qwests']['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['qwests']['mockId1'].description).toBe(updatedQwestData.description)

    // Expect that the correct User Qwest data has been updated
    expect(userQwests.completed['mockId1'].title).toBe(updatedQwestData.title)
    expect(database['user-qwests'][assignedUserId]['completed']['mockId1'].title).toBe(updatedQwestData.title)
  })
})
