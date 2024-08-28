import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import { config } from "../utils/constants.js";

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "97f6c77d-7da4-4d93-a50b-608f8d21e24f",
    "Content-Type": "application/json",
  },
});

// User info
const userInfo = new UserInfo(
  "#profile__name",
  "#profile__subheading",
  ".profile__avatar"
);

// Popups
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#profile__add-card-modal",
  handleAddCardSubmit
);
const editAvatarPopup = new PopupWithForm(
  "#profile__avatar-modal",
  handleAvatarSubmit
);
editAvatarPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#card_modal");
const trashConfirmPopup = new PopupWithConfirm("#trashcan-modal", handleDelete);

// Section
const cardSection = new Section({ items: [], renderer }, ".cards__list");

// Validators
const profileEditForm = document.querySelector("#profileEditForm");
const addCardForm = document.querySelector("#addcard__form");
const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Constants
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector(
  "#profile__subheading-input"
);
const trashModalSubmitBtn = document.querySelector(".modal__button-trash");
const editProfileImage = document.querySelector(".profile__avatar-edit");
let currentUserId;

// Functions
function handleProfileEditSubmit(profileData) {
  const { modal__input_type_name: name, modal__input_type_description: about } =
    profileData;

  console.log("Profile data to submit:", profileData);

  api
    .patchProfileInfo(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
}

function handleAddCardSubmit(newCardData) {
  console.log("New card data to submit:", newCardData);

  api
    .postCards(newCardData)
    .then((cardData) => {
      renderer(cardData);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    });
}

function handleAvatarSubmit(formData) {
  const avatarLink = formData["modal__form-input-link"];

  console.log("Avatar link to submit:", avatarLink);

  api
    .patchProfileAvatar(avatarLink)
    .then(() => {
      userInfo.setAvatarPic(avatarLink);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    });
}

function handleImageClick(card) {
  previewImagePopup.open({ name: card.name, link: card.link });
}

function handleDelete(card) {
  console.log("Handle Delete called with card:", card);
  trashConfirmPopup.open();
  trashModalSubmitBtn.addEventListener(
    "click",
    () => {
      console.log("Deleting card with ID:", card._id);
      api
        .deleteCard(card._id)
        .then(() => {
          card.removeCard();
          trashConfirmPopup.close();
        })
        .catch((err) => {
          console.error("Error deleting card:", err);
        });
    },
    { once: true }
  );
}

function createCard(item) {
  const card = new Card(
    item,
    "#card__template",
    handleImageClick,
    handleDelete,
    api // Pass the Api instance
  );
  return card.getView();
}

function renderer(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}

// Initialize Section
cardSection.renderItems();

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => addCardPopup.open());

editProfileImage.addEventListener("click", () => {
  editAvatarPopup.open();
});

// API Calls
api
  .getProfile()
  .then((currentUser) => {
    currentUserId = currentUser._id;
    console.log("Current user ID:", currentUserId);
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });
api
  .getCards()
  .then((cardData) => {
    console.log("Fetched cards:", cardData);
    cardData.forEach((cardItem) => {
      const cardElement = createCard(cardItem);
      cardSection.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards", err);
  });
