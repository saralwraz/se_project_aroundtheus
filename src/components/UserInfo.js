export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._avatarSelector = avatarSelector;

    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    // Check if elements are initialized
    if (!this._nameElement) {
      console.error(`Element with selector "${nameSelector}" not found`);
    }
    if (!this._aboutElement) {
      console.error(`Element with selector "${aboutSelector}" not found`);
    }
    if (!this._avatarElement) {
      console.error(`Element with selector "${avatarSelector}" not found`);
    }
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
