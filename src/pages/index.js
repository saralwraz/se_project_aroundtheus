import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js"; // Fixed capitalization
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import { initialCards, config } from "../utils/constants.js";

// Constants
const cardListEl = document.querySelector(".cards__list");
const profileEditForm = document.querySelector("#profileEditForm");
const profileTitleInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector(
  "#profile__subheading-input"
);
const profileEditBtn = document.querySelector("#profile__edit-button");
const addCardForm = document.querySelector("#addcard__form");
const addCardButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector("#profile-avatar");
const avatarCloseButton = document.querySelector(".modal__close");
const avatarModal = document.querySelector("#profile__avatar-modal");
const trashModalSubmitButton = document.querySelector("#modal__button-trash");
const trashIcon = document.querySelector("#card__trashcan");

// User info
const userInfo = new UserInfo("#profile__name", "#profile__subheading");

// Popups
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#profile__add-card-modal",
  handleAddCardSubmit
);
const previewImagePopup = new PopupWithImage("#card_modal");

const trashConfirmPopup = new PopupWithConfirm("#trashcan-modal", handleDelete);

// Section
const cardSection = new Section(
  { items: initialCards, renderer },
  ".cards__list"
);
cardSection.renderItems();

// Form validators
const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => addCardPopup.open());

trashIcon.addEventListener("click", () => openModal(trashConfirmPopup));
trashIcon.addEventListener("click", () => closeModal(trashConfirmPopup));

// Event handlers
function handleProfileEditSubmit(profileData) {
  const { modal__input_type_name: name, modal__input_type_description: about } =
    profileData;
  userInfo.setUserInfo(name, about);
  profileEditPopup.close();
}

function handleAddCardSubmit(newCardData) {
  renderer(newCardData);
  addCardPopup.close();
}

function handleImageClick(name, link) {
  previewImagePopup.open({ name, link });
}

function handleDelete(data) {
  trashConfirmPopup.classList.add("modal_opened");

  trashConfirmPopup.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Delete function called with data:", data);

    api
      .deleteCard(data.apiData._id)
      .then(() => {
        trashConfirmPopup.classList.remove("modal_opened");
        data.removeCard(data.cardElement);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  });
}

// Renderer + Cards
function createCard(item) {
  const card = new Card(item, "#card__template", handleImageClick);
  return card.getView();
}

function renderer(item) {
  const cardElement = createCard(item);
  cardSection.addItem(cardElement);
}

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "97f6c77d-7da4-4d93-a50b-608f8d21e24f",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error("Failed to load initial cards:", err);
  });

api
  .getProfile()
  .then((userData) => {
    console.log(userData);
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });
