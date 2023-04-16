import { Request } from 'express'
import { OAuth2Client } from 'google-auth-library'
import * as process from 'process'

export interface GoogleUserDataInterface {
  id: string
  email: string
  name: string
  picture: string
}

export class GoogleAuthService {
  request: Request
  oauth2Client: OAuth2Client

  constructor(request: Request) {
    this.request = request
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const redirectUrl = `${protocol}://${request.headers.host}/auth/google/callback`
    this.oauth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, redirectUrl)
  }

  generateAuthUrl(state: object): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['email', 'profile'],
      state: JSON.stringify(state),
    })
  }

  fetchUserData(code: string): Promise<GoogleUserDataInterface> {
    return new Promise((resolve, reject) => {
      this.oauth2Client
        .getToken(code)
        .then(({ tokens }) => {
          this.oauth2Client.setCredentials(tokens)
          this.oauth2Client
            .request({ url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json' })
            .then((userInfo) => {
              resolve(userInfo.data as GoogleUserDataInterface)
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
