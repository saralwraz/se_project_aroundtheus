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
const profileCloseBtn = document.querySelector("#modal__close-button");
const profileTitle = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__subheading");

const profileEditForm = document.querySelector("#modal__form");
const cardListEl = document.querySelector(".cards__list");
const nameInput = document.querySelector("#modal__name");
const jobInput = document.querySelector("#modal__subheading");

const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

//* Functions *//
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__text");
  const cardImageEl = cardElement.querySelector(".card__image");
  cardNameEl.textContent = cardData.name;

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardNameEl.textContent = cardData.name;

  return cardElement;
}

//*Event Handlers*//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

//* Event Listeners *//
profileEditBtn.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

profileCloseBtn.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
