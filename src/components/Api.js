export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Get Current User Info
  getProfile() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Update Profile Info
  patchProfileInfo(nameVar, bioVar) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameVar,
        about: bioVar,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Update Avatar
  patchProfileAvatar(link) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Get Initial Cards
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Create Card (POST)
  postCards(card) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error("POST Card Error:", err);
      });
  }

  // Delete Card
  deleteCard(cardID) {
    return fetch(this._baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
      });
  }

  // Like the Card (PUT)
  putCardLike(ID) {
    return fetch(this._baseUrl + `/cards/${ID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Dislike Card (DELETE)
  deleteCardLike(ID) {
    return fetch(this._baseUrl + `/cards/${ID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "97f6c77d-7da4-4d93-a50b-608f8d21e24f",
    "Content-Type": "application/json",
  },
});
