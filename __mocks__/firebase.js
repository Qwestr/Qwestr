import _ from 'lodash'
import String from 'string'
import gawk from 'gawk'

// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase')

// Define local variables
let mockDatabase = gawk({})
let mockAuthUserId = 'mockAuthUserId'

// Mocked Methods
// ##############

firebase.auth = () => {
  return {
    currentUser: {
      uid: mockAuthUserId
    }
  }
}

firebase.auth.FacebookAuthProvider = {
  PROVIDER_ID: 'MockFacebookProviderID'
}

firebase.database = () => {
  return {
    ref: (refPath) => {
      return {
        child: (childPath) => {
          return {
            push: () => {
              return {
                key: 'mockId' + (Object.keys(mockDatabase[childPath] || {}).length + 1)
              }
            }
          }
        },
        once: (prop) => {
          if (prop !== 'value') {
            throw new Error("'value' must be used as the argument")
          }
          return {
            then: (callback) => {
              callback({
                val: () => {
                  return firebase.__getMockObject(refPath)
                }
              })
            }
          }
        },
        on: (prop, callback) => {
          if (prop !== 'value') {
            throw new Error("'value' must be used as the first argument")
          }

          // gawk can't watch null values, so ensure that the mockObject is an object
          let mockObject = firebase.__getMockObject(refPath)
          if (!mockObject) {
            mockObject = {}
          }

          // Watch for changes to the database at the specified path
          gawk.watch(mockObject, (obj, source) => {
            callback({
              val: () => {
                return obj
              }
            })
          })
          // Call the callback once initially
          callback({
            val: () => {
              return firebase.__getMockObject(refPath)
            }
          })
        },
        update: (updates) => {
          for (const key in updates) {
            if ({}.hasOwnProperty.call(updates, key)) {
              firebase.__updateMockDatabase(key, updates[key])
            }
          }

          return {
            then: (callback) => {
              return
            }
          }
        }
      }
    }
  }
}

// Custom Methods
// ##############

firebase.__getAuthUserId = () => {
  return firebase.auth().currentUser.uid
}

firebase.__setAuthUserId = (uid) => {
  mockAuthUserId = uid
}

firebase.__resetAuthUserId = (uid) => {
  mockAuthUserId = 'mockAuthUserId'
}

firebase.__loadMockDatabase = (database) => {
  mockDatabase = database
}

firebase.__clearMockDatabase = (database) => {
  mockDatabase = gawk({})
}

firebase.__getMockDatabase = () => {
  return mockDatabase
}

firebase.__getMockObject = (refPath) => {
  let returnedObject = mockDatabase
  const dbObjectNames = String(refPath).stripLeft('/').stripRight('/').splitLeft('/')

  for (const object of dbObjectNames) {
    if (!returnedObject[object]) {
      return null
    } else {
      returnedObject = returnedObject[object]
    }
  }

  return returnedObject
}

firebase.__updateMockDatabase = (key, update) => {
  const dbObjectNames = String(key).stripLeft('/').stripRight('/').splitLeft('/')
  firebase.__updateMockObject(mockDatabase, update, dbObjectNames)
}

firebase.__updateMockObject = (object,  value, [firstKey, ...otherKeys]) => {
  if (!otherKeys.length) {
    if (!value) {
      delete object[firstKey]
    } else {
      if (value instanceof Object) {
        let updatedObject = value
        for (const key of Object.keys(value)) {
          if (typeof updatedObject[key] === 'undefined') {
            throw new Error("undefined value found for key: " + key)
          }
          if(!updatedObject[key] || (updatedObject[key] instanceof Object && _.isEmpty(updatedObject[key]))) {
            delete updatedObject[key]
          }
        }
        object[firstKey] = updatedObject
      } else {
        object[firstKey] = value
      }
    }
    return object
  } else {
    object[firstKey] = firebase.__updateMockObject(object[firstKey] || {}, value, otherKeys)
    if (!(Object.keys(object[firstKey]).length)) {
      delete object[firstKey]
    }
    return object
  }
}

export default firebase
