import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
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

// User info
const userInfo = new UserInfo("#profile__name", "#profile__subheading");

// Popup
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#profile__add-card-modal",
  handleAddCardSubmit
);
const previewImagePopup = new PopupWithImage("#card_modal");

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

// Renderer
function renderer(item) {
  const card = new Card(item, "#card__template", handleImageClick);
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
}
