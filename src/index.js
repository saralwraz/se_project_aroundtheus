import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import "./pages/index.css";
import { initialCards, config } from "./utils/constants.js";

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
const previewPictureCloseButton = document.querySelector(
  "#photo__close-button"
);

// User info
const userInfo = new UserInfo("#profile__name", "#profile__subheading");

// PopupWithForm
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);
const addCardPopup = new PopupWithForm(
  "#profile__add-card-modal",
  handleAddCardSubmit
);

// PopupWithImage
const previewImagePopup = new PopupWithImage("#card_modal");

// Section
const renderer = (item) => {
  const card = new Card(item, "#card__template", handleImageClick);
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
};

const cardSection = new Section(
  { items: initialCards, renderer },
  ".cards__list"
);

// Card render
cardSection.renderItems();

// FormValidator
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

previewPictureCloseButton.addEventListener("click", () => {
  previewImagePopup.close();
});

// Event handler functions
function handleProfileEditSubmit(profileData) {
  const name = profileData.title;
  const description = profileData.subheader;
  userInfo.setUserInfo(name, description);
  profileEditPopup.close();
}

function handleAddCardSubmit(newCardData) {
  const name = newCardData.title;
  const link = newCardData.url;
  renderCard({ name, link });
  addCardPopup.close();
}

function handleImageClick(name, link) {
  previewImagePopup.open({ name, link });
}
