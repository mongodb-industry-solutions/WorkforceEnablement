/*
 *
 * HomeScreen actions
 *
 */

export function loginUser(email, password) {
  return {
    type: 'LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function logoutUser() {
  return {
    type: 'LOGOUT_REQUEST',
    payload: {},
  };
}

export function realmConnection(realmUser) {
  return {
    type: 'REALM_CONNECTION_REQUEST',
    payload: { realmUser },
  };
}
