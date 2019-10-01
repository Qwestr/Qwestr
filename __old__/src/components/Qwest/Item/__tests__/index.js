import firebase from 'firebase'
import React from 'react'
import { mount } from 'enzyme'
import { Button, MenuItem } from 'react-bootstrap'
import QwestItem, {
  ActionButton, ActionButtonDropdown, ActionButtonGroup
} from '../'
import { AssignedUserQwest, AssigningUserQwest, UserQwest } from '../../../../models/Qwest'
import QwestManager from '../../../../managers/Qwest'
import UserManager from '../../../../managers/User'

function createNewUser(userId, displayName) {
  // Create User data object
  const userData = {
    uid: userId,
    displayName: displayName,
    photoURL: 'http://profileImage.png',
    providerData: [
      {
        uid: 'testUserFacebookId',
        providerId: 'facebook.com'
      }
    ]
  }

  // Create credentials data
  const credentialsData = {
    accessToken: 'testAccessToken',
    provider: 'facebook.com'
  }

  // Create a UserManager object
  const userManager = new UserManager()

  // Create the User
  userManager.createUser(userData, credentialsData, () => {})
}

afterEach(() => {
  firebase.__clearMockDatabase()
})

describe('<ActionButton />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<ActionButton />)

    // Expect that the default values exist
    expect(wrapper.text()).toBe(ActionButton.defaultProps.action.title)
    expect(wrapper.find(Button).prop('bsStyle')).toBe(ActionButton.defaultProps.action.style)
    expect(wrapper.find(Button).prop('onClick')).toBe(ActionButton.defaultProps.action.event)
  })

  it('successfully renders the component using passed-in properties', () => {
    // Mount the component
    const action = {
      title: 'Test Title',
      style: 'success',
      event: jest.fn()
    }
    const wrapper = mount(<ActionButton action={action}/>)

    // Expect that the passed-in values exist
    expect(wrapper.text()).toBe(action.title)
    expect(wrapper.find(Button).prop('bsStyle')).toBe(action.style)
    expect(wrapper.find(Button).prop('onClick')).toBe(action.event)
  })

  it('successfully calls the event function when clicked', () => {
    // Mount the component
    const action = {
      event: jest.fn()
    }
    const wrapper = mount(<ActionButton action={action}/>)

    // Simulate the click event
    wrapper.simulate('click')

    // Expect that the event function has been called
    expect(action.event).toHaveBeenCalled()
  })
})

describe('<ActionButtonGroup />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<ActionButtonGroup />)

    // Expect that the default values exist
    expect(wrapper.find(ActionButton)).toHaveLength(1)
    expect(wrapper.find(ActionButton).prop('action')).toBe(ActionButtonGroup.defaultProps.actions[0])
  })

  it('successfully renders the component using passed-in properties', () => {
    // Mount the component
    const actions = [{
      title: 'Test Title',
      style: 'success',
      event: jest.fn()
    }]
    const wrapper = mount(<ActionButtonGroup actions={actions}/>)

    // Expect that the passed-in values exist
    expect(wrapper.find(ActionButton)).toHaveLength(1)
    expect(wrapper.find(ActionButton).prop('action')).toBe(actions[0])
  })
})

describe('<ActionButtonDropdown />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<ActionButtonDropdown />)

    // Expect that the default values exist
    expect(wrapper.find(MenuItem)).toHaveLength(1)
    expect(wrapper.find(MenuItem).text()).toBe(ActionButtonDropdown.defaultProps.actions[0].title)
    expect(wrapper.find(MenuItem).prop('onClick')).toBe(ActionButtonDropdown.defaultProps.actions[0].event)
  })

  it('successfully renders the component using passed-in properties', () => {
    // Mount the component
    const actions = [{
      title: 'Test Title',
      event: jest.fn()
    }]
    const wrapper = mount(<ActionButtonDropdown actions={actions}/>)

    // Expect that the passed-in values exist
    expect(wrapper.find(MenuItem)).toHaveLength(1)
    expect(wrapper.find(MenuItem).text()).toBe(actions[0].title)
    expect(wrapper.find(MenuItem).prop('onClick')).toBe(actions[0].event)
  })

  it('successfully calls the event function when clicked', () => {
    // Mount the component
    const actions = [{
      event: jest.fn()
    }]
    const wrapper = mount(<ActionButtonDropdown actions={actions}/>)

    // Simulate the click event (on the anchor element inside the MenuItem component)
    wrapper.find(MenuItem).find('a').simulate('click')

    // Expect that the event function has been called
    expect(wrapper.find(MenuItem)).toHaveLength(1)
    expect(actions[0].event).toHaveBeenCalled()
  })
})

describe('<QwestItem />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<QwestItem />)

    // Expect that the default values exist
    expect(wrapper.text()).toContain(QwestItem.defaultProps.qwest.title)
    expect(wrapper.find(ActionButtonGroup).exists()).toBeTruthy()
    expect(wrapper.find(ActionButton).exists()).toBeFalsy()
    expect(wrapper.find(ActionButtonDropdown).exists()).toBeTruthy()
    expect(wrapper.find(MenuItem).exists()).toBeFalsy()
  })

  it('successfully renders the component using passed-in properties', () => {
    // Create new properties
    const qwest = new UserQwest({
      title: 'Qwest Name'
    })
    const qwestManager = new QwestManager()
    const userManager = new UserManager()

    // Mount the component
    const wrapper = mount(
      <QwestItem
        qwest={qwest}
        qwestManager={qwestManager}
        userManager={userManager}
      />)

    // Expect that the override values exist
    expect(wrapper.prop('qwest')).toBe(qwest)
    expect(wrapper.prop('qwestManager')).toBe(qwestManager)
    expect(wrapper.prop('userManager')).toBe(userManager)
  })

  it('successfully renders the component for an active Qwest', () => {
    // Mount the component
    const activeQwest = new UserQwest({
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={activeQwest} active/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(activeQwest.title)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Assign')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Delete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Assign')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Delete')
  })

  it('successfully renders the component for an active assigned Qwest', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    const assigningUserName = 'Assigning User'
    createNewUser(assigningUserId, assigningUserName)

    // Mount the component
    const assignedActiveQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assignedActiveQwest} active/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(assignedActiveQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned By:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assigningUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assigningUserId)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Drop')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Drop')
  })

  it('successfully renders the component for an assigned Qwest', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    const assigningUserName = 'Assigning User'
    createNewUser(assigningUserId, assigningUserName)

    // Mount the component
    const assignedActiveQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assignedActiveQwest} active/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(assignedActiveQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned By:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assigningUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assigningUserId)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Drop')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Drop')
  })

  it('successfully renders the component for an assigned Qwest', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    const assigningUserName = 'Assigning User'
    createNewUser(assigningUserId, assigningUserName)

    // Mount the component
    const assignedActiveQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assignedActiveQwest} active/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(assignedActiveQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned By:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assigningUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assigningUserId)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Drop')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Complete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Drop')
  })

  it('successfully renders the component for a completed Qwest', () => {
    // Mount the component
    const completedQwest = new UserQwest({
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={completedQwest} completed/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(completedQwest.title)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Restart')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Delete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Restart')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Delete')
  })

  it('successfully renders the component for an assigned completed Qwest', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    const assigningUserName = 'Assigning User'
    createNewUser(assigningUserId, assigningUserName)

    // Mount the component
    const assignedCompletedQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assignedCompletedQwest} completed/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(assignedCompletedQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned By:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assigningUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assigningUserId)
  })

  it('successfully renders the component for an assigned Qwest', () => {
    // Create a new User
    const assignedUserId = 'assignedUserId'
    const assignedUserName = 'Assigned User'
    createNewUser(assignedUserId, assignedUserName)

    // Mount the component
    const assigningQwest = new AssigningUserQwest({
      assignedTo: assignedUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assigningQwest} assigned/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(assigningQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned To:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assignedUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assignedUserId)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Reassign')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Revoke')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Delete')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Reassign')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Revoke')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Delete')
  })

  it('successfully renders the component for a pending Qwest', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    const assigningUserName = 'Assigning User'
    createNewUser(assigningUserId, assigningUserName)

    // Mount the component
    const pendingQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={pendingQwest} pending/>)

    // Expect that the correct components have been created
    expect(wrapper.text()).toContain(pendingQwest.title)
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Assigned By:')
    expect(wrapper.find('.qwest-item-user-details').text()).toContain(assigningUserName)
    expect(wrapper.find('.qwest-item-user-details a').prop('href')).toContain(assigningUserId)
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Accept')
    expect(wrapper.find(ActionButtonGroup).text()).toContain('Reject')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Accept')
    expect(wrapper.find(ActionButtonDropdown).text()).toContain('Reject')
  })

  it('successfully renders the component with missing User information', () => {
    // Create a new User
    const assigningUserId = 'assigningUserId'
    createNewUser(assigningUserId)

    // Mount the component
    const assignedActiveQwest = new AssignedUserQwest({
      createdBy: assigningUserId,
      title: 'Qwest Name'
    })
    const wrapper = mount(<QwestItem qwest={assignedActiveQwest} active/>)

    // Expect that the correct components have been created
    expect(wrapper.find('.qwest-item-user-details').text()).toContain('Qwestr User')
  })
})
