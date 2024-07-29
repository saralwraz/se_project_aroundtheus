import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import Section from "./components/Section.js";
import "./pages/index.css";
import { initialCards, config } from "./utils/constants.js";

//User Info
const userInfo = new UserInfo("#profile__name", "#profile__subheading");

//PopupWithForm
const profileEditPopup = new PopupWithForm(
  "#profile__edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm(
  "#profile__add-card-modal",
  handleAddCardSubmit
);

//PopupWithImage
const previewImagePopup = new PopupWithImage("#card_modal");

// Section
const renderer = (item) => {
  const card = new Card(item, "#card__template", handleImageClick);
  cardListEl.prepend(card.getView());
};

const cardSection = new Section(
  { items: initialCards, renderer },
  ".cards__list"
);

cardSection.renderItems();

//FormValidator
const profileEditFormValidator = new FormValidator(config, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardForm);
addCardFormValidator.enableValidation();

//Popups and forms event listeners
profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
  profileEditPopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

previewPictureCloseButton.addEventListener("click", () => {
  previewImagePopup.close();
});

//Popup event listeners
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
previewImagePopup.setEventListeners();

// Event handler functions
function handleProfileEditSubmit(e) {
  e.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  profileEditPopup.close();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardData = {
    name: e.target.querySelector("#add-card-title-input").value,
    link: e.target.querySelector("#add-card-link-input").value,
  };
  cardSection.addItem(cardData);
  addCardPopup.close();
}

function handleImageClick(name, link) {
  previewImagePopup.open({ name, link });
}
