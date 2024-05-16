const initialCards = [
  {
    name: "Ein Gedi, Israel",
    link: "https://unsplash.com/photos/boulder-beside-on-valley-and-bushes-VkZuNpXxdIg",
  },
  {
    name: "Niagara Falls, NY",
    link: "https://unsplash.com/photos/people-standing-on-cliff-near-waterfalls-during-daytime-61R8AY9YK0Q",
  },
  {
    name: "Jim Thorpe, PA",
    link: "https://unsplash.com/photos/green-and-brown-trees-during-daytime-MI5Xiovb-JI",
  },
  {
    name: "Versailles, France",
    link: "https://unsplash.com/photos/green-grass-field-with-trees-3Om3gtbgmiM",
  },
  {
    name: "Everglades, FL",
    link: "https://unsplash.com/photos/a-wooden-walkway-in-the-middle-of-a-forest-d1ekw-GUvn4",
  },
  {
    name: "Golan Heights, Israel",
    link: "https://unsplash.com/photos/yellow-petaled-flower-field-at-daytime-g_Abgn1slAM",
  },
];

console.log(initialCards);

function cardContent() {}

cardContent();

//* Elements *//
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileCloseBtn = document.querySelector("#modal__close-button");
const profileTitle = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__subheading");

const profileEditForm = document.querySelector("#modal__form");
const nameInput = document.querySelector("#modal__name");
const jobInput = document.querySelector("#modal__subheading");

//* Functions *//
function closePopup() {
  profileEditModal.classList.remove("modal__opened");
}

//*Event Handlers*//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
  console.log("form submitted");
}

//* Event Listeners *//
profileEditBtn.addEventListener("click", () => {
  profileEditModal.classList.add("modal__opened");
});

profileCloseBtn.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
