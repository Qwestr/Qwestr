import String from 'string';

// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase');

let mockDatabase = {};

// Mocked Methods
// ##############

firebase.auth = () => {
  return {
    currentUser: {
      uid: 'currentUserId'
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

firebase.__loadMockDatabase = (database) => {
  mockDatabase = database;
}

firebase.__clearMockDatabase = (database) => {
  mockDatabase = {};
}

firebase.__getMockDatabase = () => {
  return mockDatabase;
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
