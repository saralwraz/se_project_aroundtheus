export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return res
      .json()
      .then((error) =>
        Promise.reject(`Error: ${res.status} - ${error.message || error.error}`)
      );
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // Get Current User Info
  getProfile() {
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  // Update Profile Info
  patchProfileInfo(nameVar, bioVar) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    });
  }

  // Update Avatar
  patchProfileAvatar(link) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  // Get Initial Cards
  getCards() {
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  // Create Card (POST)
  postCards(card) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.modal__input_type_title,
        link: card.modal__input_type_link,
      }),
    });
  }

  // Delete Card
  deleteCard(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Like the Card (PUT)
  putCardLike(cardID) {
    return this._request(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Dislike Card (DELETE)
  deleteCardLike(cardID) {
    return this._request(this._baseUrl + `/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
