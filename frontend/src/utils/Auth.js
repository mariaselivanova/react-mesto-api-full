export const BASE_URL = 'https://api.mestoproject.nomoredomains.icu';

const handleRes = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

//Запрос для регистрации.
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email}),
  })
  .then(handleRes)
};

//Запрос для авторизации.
export const authorize = ( password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ password, email }),
  })
  .then(handleRes)
};

//Запрос для проверки валидности токена.
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      authorization : `Bearer ${token}`
    }
  })
  .then(handleRes)
};
