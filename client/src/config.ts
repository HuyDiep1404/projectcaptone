// CAR: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '1wz8w8k1i1'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // CAR: Create an Auth0 application and copy values from it into this map. For example:
  domain: 'dev-r3o03qujjst3uu0c.us.auth0.com',            // Auth0 domain
  clientId: 'rlo3ayCMKJlq6s2lC43A7aDXJupEcygH',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
