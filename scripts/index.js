const initialCards = [
  {
    name: "Ein Gedi, Israel",
    link: "https://images.unsplash.com/photo-1464979834326-b695d5e187e6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Niagara Falls, NY",
    link: "https://images.unsplash.com/photo-1604896777674-cd6d245567b3?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jim Thorpe, PA",
    link: "https://images.unsplash.com/photo-1603634751673-d47ba782e292?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Versailles, France",
    link: "https://images.unsplash.com/photo-1615107306244-be271e8b1407?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Everglades, FL",
    link: "https://images.unsplash.com/photo-1705988009712-70c4f2a4b0e4?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Golan Heights, Israel",
    link: "https://images.unsplash.com/photo-1554558424-4a02a6451c4b?q=80&w=3655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

//* Elements *//
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileCloseBtn = document.querySelector("#profile__close-button");
const addCardCloseBtn = document.querySelector("#add-card__close-button");

const profileTitle = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__subheading");

const profileEditForm = document.querySelector("#profile__edit-modal");
const addCardForm = document.querySelector("#addcard__form");
const cardListEl = document.querySelector(".cards__list");

const nameInput = document.querySelector("#profile__name-input");
const jobInput = document.querySelector("#profile__subheading-input");

const previewPictureModal = document.querySelector("#card_modal");
const previewPictureCloseButton = document.querySelector(
  "#photo__close-button"
);
const modalImage = previewPictureModal.querySelector(".modal__image_open");
const modalCaption = previewPictureModal.querySelector(".modal__caption");

const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile__add-card-modal");

//* Functions *//
function closePopup(modal) {
  if (modal) {
    modal.classList.remove("modal_opened");
  }
  document.removeEventListener("keydown", handleEscapeKey);
}

function openModal(modal) {
  if (modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscapeKey);
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach(closePopup);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__text");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__heart");
  const deleteButton = cardElement.querySelector(".card__trashcan");

  cardNameEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalCaption.textContent = cardData.name;
    openModal(previewPictureModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__heart_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

//* Event Handlers *//
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const cardData = {
    name: form.querySelector("#add-card-title-input").value,
    link: form.querySelector("#add-card-link-input").value,
  };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);

  form.reset();
}

//* Event Listeners *//
profileEditBtn.addEventListener("click", () => {
  openModal(profileEditModal);
});

profileCloseBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});

addCardCloseBtn.addEventListener("click", () => {
  closePopup(addCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

previewPictureCloseButton.addEventListener("click", () => {
  closePopup(previewPictureModal);
});

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closePopup(modal);
    }
  });
});
