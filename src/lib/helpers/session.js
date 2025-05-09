import { jwtDecode } from 'jwt-decode';

export function isLoggedIn() {
  const cookieName = 'isLogin';
  const findCookie = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=(.+?)(?:;|$)`));
  const cookieValue = findCookie ? findCookie[1] : undefined;
  return cookieValue ? true : false;
}

export function getUserId(jwtToken) {
  const payload = jwtDecode(jwtToken);
  return payload.user_id;
}
