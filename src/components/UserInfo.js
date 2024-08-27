export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;

    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setAvatarPic(link) {
    if (this._avatarElement) {
      this._avatarElement.src = link;
    } else {
      console.error("Avatar element is not initialized");
    }
  }

  getUserInfo() {
    if (!this._nameElement || !this._aboutElement || !this._avatarElement) {
      console.error("One or more elements are not initialized");
      return {};
    }

    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(newName, newAbout, newAvatar) {
    if (this._nameElement) this._nameElement.textContent = newName;
    if (this._aboutElement) this._aboutElement.textContent = newAbout;
    if (this._avatarElement) this._avatarElement.src = newAvatar;
  }
}
