import jsdom from 'jsdom'
import firebaseui from 'firebaseui'
import { startFirebaseUI } from '../'

it('Renders the Firebase UI component correctly', () => {
  // Setup document for testing
  const doc = jsdom.jsdom('<div id="firebaseui-auth-container"></div>')
  firebaseui.__setDocument(doc)

  // Start FirebaseUI
  startFirebaseUI('#firebaseui-auth-container', () => {})

  // Get the resulting document
  const resultDoc = firebaseui.__getDocument()

  // Expect that the correct elements have been created
  expect(resultDoc.getElementById('firebaseui-container')).toBeTruthy()
});
