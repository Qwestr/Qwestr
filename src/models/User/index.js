export class SocialUser {
  constructor(props) {
    this.uid = props.uid || null
  }
}

export default class User {
  constructor(props) {
    this.displayName = props.displayName || null
    this.photoURL = props.photoURL || null
    this.credentials = props.credentials || null
  }

  update(userData) {
    this.displayName = userData.displayName || null
    this.photoURL = userData.photoURL || null
  }

  updateCredentials(providerData, credentials) {
    for (const provider of providerData) {
      if (credentials.provider===provider.providerId && provider.providerId==='facebook.com') {
        if (!this.credentials) {
          this.credentials = {}
        }
        this.credentials['Facebook'] = {
          id: provider.uid,
          accessToken: credentials.accessToken
        }
      } else if (credentials.provider===provider.providerId && provider.providerId==='google.com') {
        if (!this.credentials) {
          this.credentials = {}
        }
        this.credentials['Google'] = {
          id: provider.uid,
          accessToken: credentials.accessToken
        }
      }
    }
  }
}
