export function parseToken(token) {
    const jwtDecode = require('jwt-decode');
    return jwtDecode(token)
}
