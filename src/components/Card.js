export default class Card {
  constructor(
    { name, altName, link, _id, isLiked, likes = [] },
    cardSelector,
    handleImageClick,
    handleConfirmModal,
    handleLikeIconClick,
    api,
    currentUserId
  ) {
    this.name = name;
    this.altName = altName;
    this.link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeIconClick = handleLikeIconClick;
    this._handleConfirmModal = handleConfirmModal;
    this._api = api;
    this._currentUserId = currentUserId;
    this.cardElement = null;
  }

  _setCardData() {
    this._cardImage.src = this.link;
    this._cardImage.alt = this.altName;
    this._cardTitle.textContent = this.name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIconClick();
    });
    this._trashButton.addEventListener("click", () => {
      console.log("Trash button clicked. Card instance:", this);
      this._handleConfirmModal(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _updateHeartIcon() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__heart_active");
    } else {
      this._likeButton.classList.remove("card__heart_active");
    }
  }

  updateHeartIcon(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("card__heart_active", this._isLiked);
  }

  _updateCardData(updatedCard) {
    this._likes = updatedCard.likes || [];
    this._isLiked = this._likes.some(
      (user) => user._id === this._currentUserId
    );

    this._updateHeartIcon();
  }

  getView() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    console.log("Card element created:", this.cardElement);
    this._likeButton = this.cardElement.querySelector(".card__heart");
    this._trashButton = this.cardElement.querySelector(".card__trashcan");
    this._cardImage = this.cardElement.querySelector(".card__image");
    this._cardTitle = this.cardElement.querySelector(".card__text");

    this._updateHeartIcon();
    this._setCardData();
    this._setEventListeners();

    return this.cardElement;
  }

  removeCard() {
    if (this.cardElement) {
      console.log("Removing card element:", this.cardElement);
      this.cardElement.remove();
      this.cardElement = null;
    } else {
      console.error("Card element is already null, cannot remove.");
    }
  }
}
