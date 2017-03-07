export class BasicUser {
  constructor(props) {
    this.uid = props.uid || null
    this.displayName = props.displayName || null
    this.photoURL = props.photoURL || null
  }
}

export class SocialUser {
  constructor(props) {
    this.uid = props.uid || null
  }
}

export default class User {
  constructor(props) {
    this.displayName = props.displayName || null
    this.photoURL = props.photoURL || null
    this.credentials = props.credentials || {}
  }

  update(userData) {
    if (userData.displayName) {
      this.displayName = userData.displayName
    }
    if (userData.photoURL) {
      this.photoURL = userData.photoURL
    }
  }

  updateCredentials(providerData, credentials) {
    for (const provider of providerData) {
      if (credentials.provider===provider.providerId && provider.providerId==='facebook.com') {
        this.credentials['Facebook'] = {
          id: provider.uid,
          accessToken: credentials.accessToken
        }
      } else if (credentials.provider===provider.providerId && provider.providerId==='google.com') {
        this.credentials['Google'] = {
          id: provider.uid,
          accessToken: credentials.accessToken
        }
      }
    }
  }
}
