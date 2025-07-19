// ✅ auth.js

export const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
}

export const setAuthToken = (token, remember = false) => {
  if (remember) {
    localStorage.setItem('authToken', token)
  } else {
    sessionStorage.setItem('authToken', token)
  }
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken')       // fixed
  sessionStorage.removeItem('authToken')     // fixed
}

export const isAuthenticated = () => {
  return !!getAuthToken()
}
