// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase');

let mockDatabase = {};

firebase.loadMockDatabase = (database) => {
  mockDatabase = database;
}

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
        }
      };
    }
  };
}

export default firebase;
