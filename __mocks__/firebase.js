// Mock out functions of original module
const firebase = jest.genMockFromModule('firebase');

let mockDatabase = {};

firebase.loadMockDatabase = (database) => {
  mockDatabase = database;
}

firebase.database = () => {
  return {
    ref: (refPath) => {
      return {
        child: (childPath) => {
          return {
            push: () => {
              const key = Object.keys(mockDatabase[childPath] || {}).length + 1;
              return {
                key
              };
            }
          };
        }
      };
    }
  };
}

export default firebase;
