import UserInfo from "./UserInfo";

export default class Profile {
  constructor(api, userInfo) {
    this._api = api;
    this._userInfo = userInfo;

    this._profileForm = document.querySelector(".profile-form");
    this._avatarForm = document.querySelector(".avatar-form");

    this._setEventListeners();
  }

  _setEventListeners() {
    // Event listener for the profile form
    this._profileForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._updateProfileInfo();
    });

    // Event listener for the avatar form
    this._avatarForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._updateProfileAvatar();
    });
  }

  _updateProfileInfo() {
    const nameInput = this._profileForm.querySelector(
      ".profile-form__input_type_name"
    );
    const bioInput = this._profileForm.querySelector(
      ".profile-form__input_type_bio"
    );

    this._api
      .patchProfileInfo(nameInput.value, bioInput.value)
      .then((updatedInfo) => {
        this._userInfo.setUserInfo(updatedInfo.name, updatedInfo.about);
      })
      .catch((err) => {
        console.error("Error updating profile info:", err);
      });
  }

  _updateProfileAvatar() {
    const avatarInput = this._avatarForm.querySelector(
      ".avatar-form__input_type_link"
    );

    this._api
      .patchProfileAvatar(avatarInput.value)
      .then((updatedInfo) => {
        this._userInfo.setAvatarPic(updatedInfo.avatar);
      })
      .catch((err) => {
        console.error("Error updating profile avatar:", err);
      });
  }
}

// Create an instance of UserInfo
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__avatar"
);

// Create an instance of UserProfile
const userProfile = new UserProfile(apiInstance, userInfo);

// Initialize the UI with current user info (optional)
document.addEventListener("DOMContentLoaded", () => {
  apiInstance
    .getUserInfo()
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    })
    .catch((err) => {
      console.error("Error fetching user info:", err);
    });
});
