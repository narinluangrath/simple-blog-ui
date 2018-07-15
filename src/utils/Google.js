function openSigninPopup( callback ) {
  try {
    gapi.auth2.getAuthInstance().signIn().then( _ => callback() )
  } catch (e) {
    console.error( "Error with popup: ", e )
    return false 
  }
}

function isSignedIn() {
  try {
    return gapi.auth2.getAuthInstance().currentUser.get().isSignedIn()
  } catch (e) {
    console.error( "Can't check signin status: ", e )
    return false
  }
}

function getUserName() {
  try {
    const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
    return profile && profile.getName()
  } catch (e) {
    console.error( "Can't get user profile: ", e )
    return false
  }
}

function getUserIdToken() {
  try {
    const auth = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
    return auth && auth.id_token
  } catch (e) {
    console.error( "Can't get user auth: ", e )
    return false
  }
}

function disconnect() {
  try {
    gapi.auth2.getAuthInstance().currentUser.get().disconnect()
    return gapi.auth2.getAuthInstance().signOut()
  } catch (e) {
    console.error( 'Disconnect error: ', e )
  }
}

module.exports = {
  openSigninPopup,
  isSignedIn,
  getUserIdToken,
  getUserName,
  disconnect
}
