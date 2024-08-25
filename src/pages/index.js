import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import { initialCards, config } from "../utils/constants.js";

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
  "profile__avatar"
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
const previewImagePopup = new PopupWithImage("#card_modal");
const trashConfirmPopup = new PopupWithConfirm("#trashcan-modal", handleDelete);

// Section
const cardSection = new Section(
  { items: initialCards, renderer },
  ".cards__list"
);

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

// Functions
function handleProfileEditSubmit(profileData) {
  const { modal__input_type_name: name, modal__input_type_description: about } =
    profileData;
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

function handleImageClick(card) {
  previewImagePopup.open({ name: card.name, link: card.link });
}

function handleDelete(card) {
  trashConfirmPopup.open();
  trashModalSubmitBtn.addEventListener(
    "click",
    () => {
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

function handleLikeIconClick(card) {
  const isLiked = card.apiData.isLiked;
  const apiAction = isLiked
    ? api.putCardLike(card._id)
    : api.deleteCardLike(card._id);

  apiAction
    .then((updatedCard) => {
      card.changeHeartIcon({ apiData: updatedCard });
    })
    .catch((err) => {
      console.error(`Error ${isLiked ? "liking" : "unliking"} card:`, err);
    });
}

function createCard(item) {
  const card = new Card(
    item,
    "#card__template",
    handleImageClick,
    handleDelete,
    handleLikeIconClick
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

// API Calls
api
  .getProfile()
  .then((currentUser) => {
    console.log("Current user ID:", currentUser._id);
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
