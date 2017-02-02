import String from 'string';

// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase');

let mockDatabase = {};
let mockAuthUserId = 'mockAuthUserId';

// Mocked Methods
// ##############

firebase.auth = () => {
  return {
    currentUser: {
      uid: mockAuthUserId
    }
  };
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
              };
            }
          };
        },
        on: (prop, callback) => {
          if (prop !== 'value') {
            throw new Error("'value' must be used as the first argument")
          }
          callback({
            val: () => {
              return firebase.__getMockObject(refPath);
            }
          });
        },
        update: (updates) => {
          for (let key in updates) {
            if ({}.hasOwnProperty.call(updates, key)) {
              firebase.__updateMockDatabase(key, updates[key]);
            }
          }

          return {
            then: (callback) => {
              return;
            }
          }
        }
      };
    }
  };
}

// Custom Methods
// ##############

firebase.__getAuthUserId = () => {
  return firebase.auth().currentUser.uid;
}

firebase.__setAuthUserId = (uid) => {
  mockAuthUserId = uid;
}

firebase.__resetAuthUserId = (uid) => {
  mockAuthUserId = 'mockAuthUserId';
}

firebase.__loadMockDatabase = (database) => {
  mockDatabase = database;
}

firebase.__clearMockDatabase = (database) => {
  mockDatabase = {};
}

firebase.__getMockDatabase = () => {
  return mockDatabase;
}

firebase.__getMockObject = (refPath) => {
  let returnedObject = mockDatabase;
  const dbObjectNames = String(refPath).stripLeft('/').stripRight('/').splitLeft('/');

  for (let object of dbObjectNames) {
    returnedObject = returnedObject[object];
  }

  return returnedObject;
}

firebase.__updateMockDatabase = (key, update) => {
  const dbObjectNames = String(key).stripLeft('/').stripRight('/').splitLeft('/');
  firebase.__updateMockObject(mockDatabase, update, dbObjectNames);
}

firebase.__updateMockObject = (object,  value, [firstKey, ...otherKeys]) => {
  if (!otherKeys.length) {
    if (!value) {
      delete object[firstKey];
    } else {
      object[firstKey] = value;
    }
    return object;
  } else {
    object[firstKey] = firebase.__updateMockObject(object[firstKey] || {}, value, otherKeys);
    if (!(Object.keys(object[firstKey]).length)) {
      delete object[firstKey];
    }
    return object;
  }
}

export default firebase;
