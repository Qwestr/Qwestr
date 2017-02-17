import firebaseConfig from '../../../firebase.json'

export class SocialUser {
  constructor(props) {
    this.uid = props.uid
  }
}

export default class User {
  constructor(props) {
    this._version = props._version || firebaseConfig.version.user
    this.displayName = props.displayName
    this.photoURL = props.photoURL
    this.credentials = props.credentials || {}
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
