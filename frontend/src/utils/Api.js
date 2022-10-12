class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //Получить изначальные карточки.
  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleRes(res))
  }

  //Получить информацию о пользователе.
  handleUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleRes(res))
  }

  //Изменить данные пользователя.
  changeUserInfo(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._handleRes(res))
  }

  //Добавить новую карточку.
  addNewCard(name, link) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._handleRes(res))
  }

  //Изменить аватар пользователя.
  changeUserAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._handleRes(res))
  }

  //Добавить или удалить лайк.
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleRes(res))
  }

  //Удалить карточку.
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._handleRes(res))
  }

}

const api = new Api({
  url: 'https://api.mestoproject.nomoredomains.icu/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  }
});

export default api
