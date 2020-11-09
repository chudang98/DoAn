// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('chatbot-authority') || ['admin', 'user']
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
  // return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('authority', JSON.stringify(proAuthority));
}

export function setToken(token) {
  if (!token) return;
  localStorage.setItem('token', token);
}