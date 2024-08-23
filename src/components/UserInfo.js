export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setAvatarPic(link) {
    this._avatarElement.src = link;
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };

    return userInfo;
  }

  setUserInfo(newName, newAbout, newAvatar) {
    this._nameElement.textContent = newName;
    this._aboutElement.textContent = newAbout;
    this._avatarElement.src = newAvatar;
  }
}
