import jsdom from 'jsdom'

// Mock out functions of original module
const firebaseui = jest.genMockFromModule('firebaseui')

// Define local variables
let doc = null

// Mocked Methods
// ##############

firebaseui.auth.AuthUI = class {
  start(containerId, config) {
    // Remove # characters from containerId
    const filteredContainerId = containerId.replace('#','')

    // Create the new firebaseui div element
    const firebaseuiContainer = jsdom.jsdom('<div id="firebaseui-container"></div>')
    const firebaseuiContainerElement = firebaseuiContainer.getElementById('firebaseui-container')

    // Append new div element to document
    doc.getElementById(filteredContainerId).appendChild(firebaseuiContainerElement)

    // Call signInSuccessCallback
    config.callbacks.signInSuccess()
  }
}

// Custom Methods
// ##############

firebaseui.__getDocument = () => {
  return doc
}

firebaseui.__setDocument = (newDocument) => {
  doc = newDocument
}

export default firebaseui
