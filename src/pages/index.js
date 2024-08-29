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

let currentUserId;

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

// Functions
function handleProfileEditSubmit(profileData) {
  const name = profileData.modal__input_type_name;
  const about = profileData.modal__input_type_description;

  profileEditPopup.renderLoading(true);

  api
    .patchProfileInfo(name, about)
    .then(() => {
      userInfo.setUserInfo(name, about);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profileEditPopup.renderLoading(false);
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

function handleAvatarSubmit(formData) {
  const avatarLink = formData["modal__form-input-link"];

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
  const apiAction = card._isLiked
    ? api.deleteCardLike(card._id)
    : api.putCardLike(card._id);

  apiAction
    .then((updatedCard) => {
      console.log(`API action succeeded. Updated card data:`, updatedCard);
      this.updateHeartIcon();
    })
    .catch((err) => {
      console.error(
        `Error ${card._isLiked ? "unliking" : "liking"} card:`,
        err
      );
    });
}

function createCard(cardData) {
  const cardInstance = new Card(
    {
      name: cardData.name,
      altName: cardData.altName || "",
      link: cardData.link,
      _id: cardData._id,
      isLiked: cardData.isLiked || false,
      likes: cardData.likes,
    },
    "#card__template",
    handleImageClick,
    () => handleDelete(cardInstance),
    () => handleLikeIconClick(cardInstance)
  );

  return cardInstance.getView();
}

function renderer(cardData) {
  const cardElement = createCard(cardData);
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
    userInfo.setUserInfo(
      currentUser.name,
      currentUser.about,
      currentUser.avatar
    );
  })
  .catch((err) => {
    console.error("Failed to load user information:", err);
  });

api
  .getCards()
  .then((cardsData) => {
    cardsData.forEach((cardItem) => {
      renderer(cardItem);
    });
  })
  .catch((err) => {
    console.error("Error fetching initial cards", err);
  });
