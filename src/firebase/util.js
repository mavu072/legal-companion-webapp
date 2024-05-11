import firebase from 'firebase/compat/app';

/**
 * Returns a server-generated timestamp in the written data.
 * @returns {firebase.firestore.FieldValue} server-generated timestamp
 */
const getServerTimestamp = () => {
    return firebase.firestore.FieldValue.serverTimestamp();
}

/**
 * Google auth provider.
 * @returns {firebase.auth.GoogleAuthProvider}
 */
function googleAuthProvider() {
    return new firebase.auth.GoogleAuthProvider();
}

/**
 * Facebook auth provider.
 * @returns {firebase.auth.FacebookAuthProvider}
 */
function facebookAuthProvider() {
    return new firebase.auth.FacebookAuthProvider();
}

export { getServerTimestamp, googleAuthProvider, facebookAuthProvider }