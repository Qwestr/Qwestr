import String from 'string';

// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase');

let mockDatabase = {};

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
                key: Object.keys(mockDatabase[childPath] || {}).length + 1
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

firebase.__loadMockDatabase = (database) => {
  mockDatabase = database;
}

firebase.__getMockDatabase = () => {
  return mockDatabase;
}

firebase.__updateMockObject = (obj,  value, [firstKey, ...otherKeys]) => {
  if (!otherKeys.length) {
    obj[firstKey] = value;
    return obj;
  } else {
    obj[firstKey] = firebase.__updateMockObject(obj[firstKey] || {}, value, otherKeys);
    return obj;
  }
}

firebase.__updateMockDatabase = (key, update) => {
  const dbObjectNames = String(key).stripLeft('/').stripRight('/').splitLeft('/');
  firebase.__updateMockObject(mockDatabase, update, dbObjectNames);
}

export default firebase;
