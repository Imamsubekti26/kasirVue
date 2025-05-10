import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export function isLoggedIn() {
  return Cookies.get('isLogin') ? true : false;
}

export function getUserId(jwtToken) {
  const payload = jwtDecode(jwtToken);
  return payload.user_id;
}
