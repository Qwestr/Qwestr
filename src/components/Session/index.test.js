import {
  AuthUserContext,
  withAuthentication,
  withAuthorization,
  withEmailVerification,
  withUnauthorization,
} from './index'

describe('Session', () => {
  describe('AuthUserContext', () => {
    it('should exist!', () => {
      expect(AuthUserContext).toBeTruthy()
    })
  })

  describe('withAuthentication', () => {
    it('should exist!', () => {
      expect(withAuthentication).toBeTruthy()
    })
  })

  describe('withAuthorization', () => {
    it('should exist!', () => {
      expect(withAuthorization).toBeTruthy()
    })
  })

  describe('withEmailVerification', () => {
    it('should exist!', () => {
      expect(withEmailVerification).toBeTruthy()
    })
  })

  describe('withUnauthorization', () => {
    it('should exist!', () => {
      expect(withUnauthorization).toBeTruthy()
    })
  })
})
